# -*- coding: utf-8 -*-
class ActivitiesController < ApplicationController
  before_filter :authenticate_user!

  def create
    a = current_user.activities.build(params[:activity])
    a.save

    redirect_to current_user
    
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
        tmp[:count] = @activity.data_points.joins(:student).where("students.name = ?", a.student.name).count
    
        @students << tmp
      end
      p @students
    else
      flash[:alert] = "Não pode aceder a essa atividade" 
      redirect_to root_path
    end
    
  end
end
