class ThermoFilterController < ApplicationController

  def index
    a = Activity.find(session[:activity])
    @filtered = []
     
    tmp = []
    a.filtered.includes(:template).each do |i|
      tmp << i
      if tmp.count == 2
        @filtered << tmp
        tmp = []
      end
    end
    @filtered << tmp if tmp.count > 0
    
  end

  def filter
    a = Activity.find(params[:id])

    redirect_to a.template.url
  end
end
