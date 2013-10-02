class AnswersController < ApplicationController

  def create
    a = Answer.create(student_id: session[:student], activity_id: session[:activity], questions: [], answers: [])
    
    a.questions << "modelo"
    a.answers << params[:model]
    
    a.questions << params[:question1]
    a.questions << params[:question2]
    a.questions << params[:question3]
    
    a.answers << params[:answer1]
    a.answers << params[:answer2]
    a.answers << params[:answer3]
    
    a.save

    respond_to do |format| 
      format.js
    end
    
  end
end
