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
      @answers = @activity.answers
      @questions = @activity.questions
      

    else
      flash[:alert] = "Não pode aceder a essa atividade" 
      redirect_to root_path
    end
    
  end
end
