class ThermalCapacitiesController < ApplicationController

  def index
    if session[:url] != request.path || session[:activity] == nil
      redirect_to root_path
    end

    
    
  end
end
