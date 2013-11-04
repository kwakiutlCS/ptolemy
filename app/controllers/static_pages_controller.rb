# -*- coding: utf-8 -*-
class StaticPagesController < ApplicationController
  def index
    if params[:code]
      t = Template.find(params[:template_id])
      a = t.activities.where(code: params[:code]).first
      
      if a
        session[:deadline] = a.deadline
        
        session[:activity] = a.id
        session[:url] = a.template.url
        redirect_to a.template.url
      else
        flash[:alert] = "Não existe nada com esse código"
        redirect_to root_path
      end
    else
      cat = params[:category] || 1
      @subcategories = SubCategory.all
      t = Template.where(sub_category_id: cat)

      @templates = []
      tmp = []

      t.each do |e|
        
        tmp << e
        if tmp.count == 2
          @templates << tmp
          tmp = []
        end
      end
      @templates << tmp if tmp.count == 1
          

      respond_to do |format|
        format.html
        format.js {render :index, :locals => {:cat => cat}}
      end
    end
    
  end


  def set_name
    
    if session[:activity]
      session[:prediction] = nil
      remove_anonymous_data_points
    else
      redirect_to root_path
    end

    
    s = User.create(email: nil, password: "password", name: params[:name], role: "student")
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


  private
  def remove_anonymous_data_points
    activity = Activity.find(session[:activity])
    users = activity.answers.select(:user_id)
    u = []
    users.each do |i|
      u << i.user_id
    end
    
    if activity.answers.any?
      points = activity.data_points.where("user_id not in (?)", u)
    else
      points = activity.data_points
    end

    points.each do |i|
      i.destroy
    end
    
    
  end
end
