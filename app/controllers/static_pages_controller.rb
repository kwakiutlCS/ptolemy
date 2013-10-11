# -*- coding: utf-8 -*-
class StaticPagesController < ApplicationController
  def index
    if params[:code]
      a = Activity.where(code: params[:code]).first
      if a
        session[:deadline] = a.deadline
        
        session[:activity] = a.id
        session[:url] = a.template.url
        redirect_to session[:url]
      else
        flash[:alert] = "Não existe nada com esse código"
        redirect_to static_pages_path
      end
    end
    
  end


  def set_name
    
    s = Student.create(name: params[:name])
    if s.valid?
      session[:student] = s.id
      
      cap = []
      s.name.split.each do |n|
        cap << n.capitalize
      end
      s.name = cap.join(" ")
      s.save
     
    else
      flash[:alert] = "Por favor introduza o nome"
      
    end
    
    respond_to do |format|
        format.html
        format.js
    end
  end 
end
