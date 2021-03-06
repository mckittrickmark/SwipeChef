import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button, TextInput, TouchableHighlight, AsyncStorage} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import t from 'tcomb-form-native'
import Navbar from "../partials/Navbar";

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  username: t.String,
  password: t.String,
  confirmPassword: t.String
});

const options = {
  fields: {
    password: {
      password: true,
      secureTextEntry: true
    },
    confirmPassword: {
    password: true,
    secureTextEntry: true,
    error: "passwords don't match"
  }
  }
};


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {errorMessage: null}
  }

  render () {


  buttonPressToLogin = (e) => {
    console.log("-------------------login button")
    console.log(this.props)
    this.props.trx.updateCurrentScreen("register", "login")
  }

  submitRegister = (e) => {
    console.log('CHECK--------------------------------')
    let registerInputs = this.refs.form.getValue()
    console.log("--------------------------- REGISTER INPUTS")
    console.log(registerInputs)

    if (!registerInputs || !registerInputs.password || !registerInputs.confirmPassword || !registerInputs.username || !registerInputs.email ) {
      this.setState({errorMessage: "All fields are required."})
      return
    }
    if (!registerInputs || registerInputs.confirmPassword != registerInputs.password ) {
      this.setState({errorMessage: "Passwords must match"})
      return
    }

    fetch(`http://172.46.0.254:3000/users`, {
        method: 'POST',
        headers:
          {"Accept": "application/json",
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `email=${registerInputs.email}&username=${registerInputs.username}&password=${registerInputs.password}&password_confirmation=${registerInputs.confirmPassword}` // <-- Post parameters
    }).then(results => {
      if (!results._bodyInit.includes('400')) {
        console.log(results)
        var storeData = async () => {
          try {
            await AsyncStorage.setItem('swipeChefToken', results._bodyInit);
          } catch (error) {
            console.log("Error Saving Data")
          }
        }
        storeData()
        this.props.trx.updateCurrentUser(results)
        this.props.trx.updateCurrentScreen("register", "swipe")
        //AsyncStorage.getItem('swipeChefToken').then(storageTest => {
        //  console.log("------------------------------STORAGE TEST")
        //  console.log(storageTest)
        //})

      } else {
        this.setState({errorMessage: "Username already taken."})
      }
    })
  }

  errorMessageText = this.state.errorMessage ? <Text styke={{color:"red"}}>{this.state.errorMessage}</Text> : <Text></Text>

    return (
      <View>
      <Navbar stateVars={this.props.stateVars} style={{height: heightPercentageToDP('10%')}} trx={this.props.trx} />
       <View style={styles.container}>
        <Form type={User} options={options} ref="form" />
         <TouchableHighlight style={styles.button} onPress={submitRegister} underlayColor="#f46969">
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableHighlight>
        {errorMessageText}
        <Text>Already have an account? <Text style={{fontWeight: 'bold'}} onPress={buttonPressToLogin}>Login.</Text></Text>
      </View>
      </View>

      )

  }
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  buttonText: {
    fontSize: 18,
    color: "#E9E2BB",
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#C53A32',
    borderColor: '#C53A32',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

export default Register;