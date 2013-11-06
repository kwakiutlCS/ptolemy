class ThermalCapacitiesTempController < ApplicationController

  def index
    if session[:url] != request.path || session[:activity] == nil
      redirect_to root_path
    end

    @user = user_signed_in?
  end
end
