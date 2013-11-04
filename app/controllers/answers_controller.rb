class AnswersController < ApplicationController
  before_filter :authenticate_user!, only: [:destroy]

  def create
    a = Answer.create(questions: [], answers: [])
    a.user_id = session[:student]
    a.activity_id = session[:activity]
    a.save
    
    a.questions << "modelo"
    a.answers << params[:model]
    
    a.questions << params[:question1]
    a.questions << params[:question2]
    a.questions << params[:question3]
    a.questions << params[:question4]
    
    a.answers << params[:answer1]
    a.answers << params[:answer2]
    a.answers << params[:answer3]
    a.answers << params[:answer4]
    
    a.time_submission = Time.now

    a.save

    respond_to do |format| 
      format.js {render "#{session[:url]}/create_answers" }
    end
    
  end



  def destroy
    a = Answer.find(params[:id])
    @activity = current_user.activities.where(id: params[:activity_id]).first

    if @activity && a.activity_id == @activity.id
      a.destroy
    else
      redirect_to root_path
    end

    answers = @activity.answers.includes(:user).order("users.name")
    @students = []

    answers.each do |a|
      tmp = {}
      tmp[:activity] = a.id
      tmp[:name] = a.user.name
      tmp[:answers] = a.questions.zip(a.answers)
      tmp[:start] = a.user.created_at
      tmp[:end] = a.time_submission
      tmp[:id] = a.user.id
      tmp[:points] = @activity.data_points.joins(:user).where("users.id = ?", a.user.id)
      tmp[:count] = tmp[:points].count
    
      @students << tmp
    end
      

    respond_to do |format|
      format.js 
    end
  end

end
