# -*- coding: utf-8 -*-
class ActivitiesController < ApplicationController
  before_filter :authenticate_user!

  def create
    template = params[:activity].delete(:template_id)
    a = current_user.activities.build(params[:activity])
    a.template_id = template
    a.save

    redirect_to templates_path
    
  end


  def show
    
    @activity = current_user.activities.where(id: params[:id]).first
    
    if @activity
      answers = @activity.answers.includes(:student).order("students.name")
      
      @students = []

      answers.each do |a|
        tmp = {}
        tmp[:name] = a.student.name
        tmp[:answers] = a.questions.zip(a.answers)
        tmp[:start] = a.student.created_at
        tmp[:end] = a.time_submission
        tmp[:id] = a.student.id
        tmp[:count] = @activity.data_points.joins(:student).where("students.id = ?", a.student.id).count
    
        @students << tmp
      end
      
    else
      flash[:alert] = "Não pode aceder a essa atividade" 
      redirect_to root_path
    end
    
  end
end
