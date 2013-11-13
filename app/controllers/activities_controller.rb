# -*- coding: utf-8 -*-
class ActivitiesController < ApplicationController
  include AnswerCompilation

  before_filter :authenticate_user!
  before_filter :set_cache_buster, only: [:show]

  def create
    template = params[:activity].delete(:template_id)
    a = current_user.activities.build(params[:activity])
    a.template_id = template
    a.save

    redirect_to templates_path
    
  end


  def show
    @activity = current_user.activities.includes(:template).where(id: params[:id]).first
    
    user_ids = []
    params.each do |i|
      @user_ids << i[7,9] if i[0,7] == "userbox"
    end

    if @activity
      compile_answers()
      @answers = @activity.answers.includes(:user).order("users.name")
      
    else
      flash[:alert] = "Não pode aceder a essa atividade" 
      redirect_to root_path
    end

    respond_to do |format|
      format.html
      format.js
    end
    
  end


  def updateTeacherGraph
    d = getDataForTeacher(params[:id], params[:points])
  
    respond_to do |format|
      format.json {render json: d.to_json}
    end
  end



  private
  def getDataForTeacher(activity, points)
    activity = Activity.find(activity)
    if activity
      answers = activity.answers.includes(:user,:data_points).where("id in (?)", points)
      
      names = {}
      d = {}
        
      if answers.any? && !answers.first.data_points.first.series 
        d[:process] = 1
        answers.each do |a|
          a.data_points.each do |i|
            if d[a.id]
              d[a.id] << [i.x,i.y]
            else
              names[a.id] = a.user.name
              d[a.id] = [[i.x,i.y]]
            end
          end
        end
        d[:names] = names

      elsif answers.any?
        answers_id = []
        answers.each do |a|
          answers_id << a.id
        end
        d[:process] = 2
        series = activity.data_points.select(:series).group(:series)
        series.each do |i|
          points = activity.data_points.where("series = ?", i.series)
          d[i.series] = []
          points.each do |j|
            d[i.series] << [j.x,j.y] if answers_id.include? j.answer_id 
          end
        end
        
      end
    end
    
    d
  end
end
