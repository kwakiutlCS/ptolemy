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
end
