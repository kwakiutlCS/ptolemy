class AnswersController < ApplicationController

  def create
    a = Answer.create(questions: [], answers: [])
    a.student_id = session[:student]
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
end
