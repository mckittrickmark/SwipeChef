import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button, ScrollView} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';


import FriendListitem from "../partials/FriendListitem";

function FriendList (props) {



const listElements = props.friendsList.map((friend) =>
 <FriendListitem friend={friend} trx={props.trx}/>
)

  return (
    <View>
      <Text>FUCK</Text>
      {listElements}
    </View>
  )
}


export default FriendList;