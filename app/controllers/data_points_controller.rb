class DataPointsController < ApplicationController

  def index
    getData(params[:series])
    
    respond_to do |format|
      format.js {render "#{session[:url]}/create_data_points"}
    end
  end


  def create
    DataPoint.create(x: params[:x], y: params[:y], activity_id: session[:activity], student_id: session[:student], series: params[:series])

    getData(params[:series])
    
    
    respond_to do |format|
      format.html {
        redirect_to session[:url]
      }
      format.js {render "#{session[:url]}/create_data_points"}
    end
  end

  def destroy
    
    data = DataPoint.find(params[:id])
    data.destroy 

    getData(params[:series])

    respond_to do |format|
      format.js {render "#{session[:url]}/create_data_points"}
    end
  end


  def updateGraph
    getData(params[:series])
    
    data = {plot_data: @plot_data, user_data: @user_data, copper: @copper,  iron: @iron, oil: @oil, water: @water, aluminium: @aluminium,  initial_prediction: session[:prediction]}
    

    respond_to do |format|
      format.json {render json: data.to_json}
    end
  end





  private
  def getData(series)
    if series
      @data = DataPoint.where(student_id: session[:student], activity_id: session[:activity], series: series).order(:x)
      @series = series
    else
      @data = DataPoint.where(student_id: session[:student], activity_id: session[:activity]).order(:x)
    end

    if @data.any?
      unless @data.first.series
        all = DataPoint.where("student_id <> ? and activity_id = ?", session[:student], session[:activity]).order(:x)
        @plot_data = [] 
        @user_data = []
        all.each do |i|
          @plot_data << [i.x,i.y]
        end
        @data.each do |i|
          @user_data << [i.x,i.y]
      end
      else
        possible_series = []
        all = DataPoint.where("activity_id = ?", session[:activity]).order(:x)
        
        all.each do |i|
        
          unless eval("@#{i.series}")
            eval("@#{i.series} = []") 
          end
        eval("@#{i.series} << [#{i.x}, #{i.y}]")
        
        end
      end
    end
  end
end
