# -*- coding: utf-8 -*-
class StaticPagesController < ApplicationController
  def index
    if params[:code]
      a = Activity.where(code: params[:code]).first
      if a
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
    name = params[:name]
    unless name == ""
      cap = []
      name.split.each do |n|
        cap << n.capitalize
      end
      session[:name] = cap.join(" ")
     
    else
      flash[:alert] = "Por favor introduza o nome"
      
    end
    
    respond_to do |format|
        format.html
        format.js
    end
  end 
end
