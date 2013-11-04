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
    
    @activity = current_user.activities.includes(:template).where(id: params[:id]).first
    
    if @activity
      answers = @activity.answers.includes(:user).order("users.name")
      
      @students = []

      answers.each do |a|
        tmp = {}
        tmp[:answer] = a.id
        tmp[:name] = a.user.name
        tmp[:answers] = a.questions.zip(a.answers)
        tmp[:start] = a.user.created_at
        tmp[:end] = a.time_submission
        tmp[:id] = a.user.id
        tmp[:points] = @activity.data_points.joins(:user).where("users.id = ?", a.user.id)
        tmp[:count] = tmp[:points].count
    
        @students << tmp
      end
      
    else
      flash[:alert] = "Não pode aceder a essa atividade" 
      redirect_to root_path
    end
    
  end
end
