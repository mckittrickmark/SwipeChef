class FridgesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @user_fridge = current_user.fridges
    @user_fridge_recipes = @user_fridge.map {|fridge_item| Recipe.find(fridge_item['recipe_id'])}
    puts @user_fridge_recipes

    respond_to do |format|
      format.json { render json: @user_fridge_recipes }
    end
  end

  def create
    puts "is this working????"
     @fridge = Fridge.find_or_create_by(fridge_params)

    respond_to do |format|
      format.json { render json: @fridge }
    end
  end



  private

  def fridge_params
    params.permit(
      :recipe_id,
      :user_id
      )
  end

end