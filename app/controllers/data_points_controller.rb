class DataPointsController < ApplicationController
  include AnswerCompilation

  def index
    getData(params[:series])
    
    respond_to do |format|
      format.js {render "#{session[:url]}/create_data_points"}
    end
  end


  def create
    d = DataPoint.new(x: params[:x], y: params[:y], series: params[:series])
    d.answer_id = session[:answer]
    d.activity_id = session[:activity]
    d.save

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
    point_id = data.id
    answer_id = data.answer_id
    activity_id = data.activity_id
    activity = Activity.find(activity_id)

    if ((current_user && current_user.role == "teacher" && activity.user_id == current_user.id) || session[:answer] == answer_id)
      data.destroy 
    end

    getData(params[:series])
    
    if (current_user && current_user.role == "teacher")
      url = "teachers/remove_data_points"
      @activity = activity

      compile_answers()

    else
      url = "#{session[:url]}/create_data_points"
    end

    
    respond_to do |format|
      format.js {render url, locals: {point: point_id}}
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
      @data = DataPoint.where(answer_id: session[:answer], series: series).order(:x)
      @series = series
    else
      @data = DataPoint.where(answer_id: session[:answer]).order(:x)
    end

    if @data.any?
      unless @data.first.series
        all = DataPoint.where("answer_id <> ? and activity_id = ?", session[:answer], session[:activity]).order(:x)
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
