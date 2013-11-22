# -*- coding: utf-8 -*-
class StaticPagesController < ApplicationController
  def index
    if params[:code]
      t = Template.find(params[:template_id])
      a = t.activities.where(code: params[:code]).first
      
      if a
        session[:deadline] = a.deadline
        session[:template] = t.id
        session[:activity] = a.id
        session[:url] = t.url
        
        if signed_in? && current_user.role == "student"
          remove_anonymous_data_points
          session[:student] = current_user.id
          answer = Answer.new(answers: [""], questions: [""])
          answer.activity_id = a.id
          answer.user_id = current_user.id
          answer.submited = false
          answer.save
          session[:answer] = answer.id
          session[:prediction] = nil
          
        end
        
        redirect_to t.url
      else
        flash[:alert] = "Não existe nada com esse código"
        redirect_to root_path
      end
    else
      cat = params[:category] || 1
      @subcategories = SubCategory.all
      t = Template.where(sub_category_id: cat, filter_id: nil)

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
    
    unless session[:activity]
      redirect_to root_path
    else
      remove_anonymous_data_points
      session[:prediction] = nil
      
    end

    pass = rand(36**7...(36**8)).to_s(36)
    s = User.new(email: nil, password: pass, name: params[:name], role: "student", account_type: 2)
    if s.save
      session[:student] = s.id
      answer = Answer.new(answers: [""], questions: [""])
      answer.activity_id = session[:activity]
      answer.user_id = s.id
      answer.submited = false
      answer.save
      session[:answer] = answer.id
      
      
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

  
  def filter
    answer = Answer.find(session[:answer])
    answer.activity_id = params[:activity]
    answer.save
    session[:activity] = params[:activity]
    session[:url] = params[:url]
    session[:template] = params[:template]
    redirect_to params[:url]
  end


  private
  def remove_anonymous_data_points
    activity = Activity.find(session[:activity])
    answers = activity.answers.old
    
    answers.each do |i|
      i.destroy
    end
    
    
  end
end
