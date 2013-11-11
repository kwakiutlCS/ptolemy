# -*- coding: utf-8 -*-
class ActivitiesController < ApplicationController
  include AnswerCompilation

  before_filter :authenticate_user!

  def create
    template = params[:activity].delete(:template_id)
    a = current_user.activities.build(params[:activity])
    a.template_id = template
    a.save

    redirect_to templates_path
    
  end


  def show
    
    @activity = current_user.activities.includes(:template).where(id: params[:id]).first
    
    if @activity
      compile_answers()
      
    else
      flash[:alert] = "Não pode aceder a essa atividade" 
      redirect_to root_path
    end
    
  end


  def updateTeacherGraph
    d = getDataForTeacher(params[:id])

    
      
    respond_to do |format|
      format.json {render json: d.to_json}
    end
  end



  private
  def getDataForTeacher(activity)
    activity = Activity.find(activity)
    if activity
      answers = activity.answers.includes(:user)
      
      names = {}
      d = {}
      answers.each do |a|
        a.data_points.each do |i|
          if d[a.user.id]
            d[a.user.id] << [i.x,i.y]
          else
            names[a.user.id] = a.user.name
            d[a.user.id] = [[i.x,i.y]]
          end
        end
      end
    end
    d[:names] = names
    
    d
  end
end
