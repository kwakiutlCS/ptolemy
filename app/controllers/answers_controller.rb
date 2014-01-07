class AnswersController < ApplicationController
  include AnswerCompilation

  before_filter :authenticate_user!, only: [:destroy]

  def create
    a = Answer.find(session[:answer])
    a.questions = []
    a.answers = []
    a.parameters = []

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

    a.parameters << params[:param_k]
    a.parameters << params[:param_h]
    a.parameters << params[:param_b]
    
    a.time_submission = Time.now
    
    a.submited = true
    a.save

    if signed_in?
      act = Activity.find(session[:activity])
      t = act.template_id
      current_user.completed << t unless current_user.completed.include? t
      current_user.save
    end


    session[:activity] = nil

    respond_to do |format| 
      format.js {render "#{session[:url]}/create_answers" }
    end
    
  end



  def destroy
    a = Answer.find(params[:id])
    @activity = current_user.activities.where(id: params[:activity_id]).first
    @answers = @activity.answers.includes(:data_points, :user).order("users.name")
    if @activity && a.activity_id == @activity.id
      u = User.find(a.user_id)
      u.completed.delete(@activity.template_id)
      u.save
      a.destroy
    else
      redirect_to root_path
    end

    compile_answers()
      

    respond_to do |format|
      format.js 
    end
  end

  
  def leave_page
    if (session[:answer])
      a = Answer.find(session[:answer])
      unless a.submited
        a.destroy
      end
    end

    respond_to do |format|
      format.js
    end
  end

end
