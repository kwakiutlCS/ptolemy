class TeachersController < ApplicationController
  before_filter :authenticate_user!
  before_filter :set_cache_buster

  def show
    if current_user.id == params[:id].to_i
      @activities = current_user.activities.includes(:answers)
    else
      redirect_to root_path
    end
  end
  
end
