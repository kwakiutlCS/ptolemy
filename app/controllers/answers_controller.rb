class AnswersController < ApplicationController
  include AnswerCompilation

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

    compile_answers()
      

    respond_to do |format|
      format.js 
    end
  end

end
