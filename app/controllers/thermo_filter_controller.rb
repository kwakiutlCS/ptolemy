class ThermoFilterController < ApplicationController

  def index
    a = Activity.find(session[:activity])
    @filtered = a.filtered.includes(:template)
  end
end
