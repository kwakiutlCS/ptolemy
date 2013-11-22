class ThermoFilterController < ApplicationController

  def index
    t = Template.find(session[:template])
    @filtered = t.filtered
  end
end
