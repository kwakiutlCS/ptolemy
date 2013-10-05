class TeachersController < ApplicationController
  before_filter :authenticate_user!

  def show
    if current_user.id == params[:id].to_i
      @activities = current_user.activities.includes(:answers)
    else
      redirect_to root_path
    end
  end
  
end