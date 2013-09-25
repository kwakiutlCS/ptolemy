class DataPointsController < ApplicationController

  def create
    DataPoint.create(x: params[:volume], y: params[:energy], activity_id: session[:activity], name: session[:name])

    @data = DataPoint.where(name: session[:name], activity_id: session[:activity]).order(:x)

    all = DataPoint.where(activity_id: session[:activity]).order(:x)
    @plot_data = [] 
    all.each do |i|
      @plot_data << [i.x,i.y]
    end
    
    respond_to do |format|
      format.html {
        redirect_to session[:url]
      }
      format.js
    end
  end
end
