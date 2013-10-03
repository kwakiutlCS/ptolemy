class ActivitiesController < ApplicationController


  def create
    Activity.create(params[:activity])
    
    redirect_to current_user
  end
end
