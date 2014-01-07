# -*- coding: utf-8 -*-
class ActivitiesController < ApplicationController
  include AnswerCompilation

  before_filter :authenticate_user!
  before_filter :set_cache_buster, only: [:show]

  def create
    template = params[:activity].delete(:template_id)
    a = current_user.activities.build(params[:activity])
    a.template_id = template
    a.save

    t = Template.find(template)
    
    if t.filtered.count > 0 
      t.filtered.each do |i|
        x = current_user.activities.build(params[:activity])
        x.template_id = i.id
        x.filter_id = a.id
        x.inactive = true unless params[("filter"+i.id.to_s).to_sym]
        x.save
      end
    end

    redirect_to templates_path
    
  end


  def show
    @activity = current_user.activities.includes(:template).where(id: params[:id]).first
    
    user_ids = []
    params.each do |i|
      @user_ids << i[7,9] if i[0,7] == "userbox"
    end

    if @activity
      compile_answers()
      @answers = @activity.answers.includes(:user).order("users.name")
      
    else
      flash[:alert] = "Não pode aceder a essa atividade" 
      redirect_to root_path
    end

    respond_to do |format|
      format.html
      format.js
    end
    
  end


  def updateTeacherGraph
    

    d = getDataForTeacher(params[:id], params[:points])
  
    respond_to do |format|
      format.json {render json: d.to_json}
    end
  end


  def switch
    a = Activity.find(params[:id])
    a.inactive = !a.inactive
    a.save
    act = current_user.activities.includes(:answers).order(:id)
    @activities = []

    act.each do |i|
      @activities << i unless i.filter?
    end
    
    respond_to do |format|
      format.js
    end
  end

  private
  def getDataForTeacher(activity, points)
    activity = Activity.find(activity)
    if activity
      answers = activity.answers.includes(:user,:data_points).where("id in (?)", points)
      
      names = {}
      d = {}
      params = {}
      max_x = 0

      if answers.any? && !answers.first.data_points.first.series 
        d[:process] = 1
        answers.each do |a|
          a.data_points.each do |i|
            max_x = i.x if i.x > max_x
            if d[a.id]
              d[a.id] << [i.x,i.y]
            else
              names[a.id] = a.user.name
              d[a.id] = [[i.x,i.y]]
            end
          end
          
          params[a.id] = getModelPoints(a.answers[0], a.parameters, max_x)
        end
        d[:names] = names
        d[:params] = params

      elsif answers.any?
        answers_id = []
        answers.each do |a|
          answers_id << a.id
        end
        d[:process] = 2
        meta = {}
        series = activity.data_points.select(:series).group(:series)
        series.each_with_index do |i,index|
          points = activity.data_points.where("series = ?", i.series)
          d[i.series] = []
          meta[index] = []
          points.each do |j|
            if answers_id.include? j.answer_id 
              d[i.series] << [j.x,j.y] 
              meta[index] << j.answer_id
            end
          end
        end
        
        d[:meta] = meta
      end
    end
    
    d
  end



  def getModelPoints(model, params, max) 
    points = []
    step = max/40
    counter = 0
    model = model.to_i

    tmp = []
    params.each do |p|
      tmp << p.to_f
    end
    
    40.times do |i|
      if model == 1
        points << [counter, tmp[0]*counter+tmp[2]]
      elsif model == 2
        points << [counter, tmp[0]*(counter-tmp[1])**2+tmp[2]]
      elsif model == 3
        points << [counter, tmp[0]*(counter-tmp[1])**3+tmp[2]]
      elsif model == 4
        points << [counter, tmp[0]*(counter-tmp[1])**(0.5)+tmp[2]]
      elsif model == 5
        points << [counter, tmp[2]]
      end
      counter += step
    end
      
    return points
  end

    
end
