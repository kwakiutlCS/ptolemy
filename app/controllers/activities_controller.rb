class ActivitiesController < ApplicationController
  before_filter :authenticate_user!

  def create
    a = current_user.activities.build(params[:activity])
    a.save

    redirect_to current_user
    
  end
end
