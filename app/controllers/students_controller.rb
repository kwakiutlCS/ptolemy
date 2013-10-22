class StudentsController < ApplicationController
  before_filter :authenticate_user!

  def destroy
    
    s = Student.find(params[:id])
    
    
    @activity = current_user.activities.where(id: params[:activity_id]).first
    
    answers = @activity.answers.includes(:student).order("students.name")

    destroy_flag = false

    if @activity && answers
      answers.each do |a|
        destroy_flag = true if a.student == s
      end
    end
      
    if destroy_flag
      s.destroy
      answers = @activity.answers.includes(:student).order("students.name")
    else
      redirect_to root_path
    end
      
    @students = []

    answers.each do |a|
      tmp = {}
      tmp[:name] = a.student.name
      tmp[:answers] = a.questions.zip(a.answers)
      tmp[:start] = a.student.created_at
      tmp[:end] = a.time_submission
      tmp[:id] = a.student.id
      tmp[:points] = @activity.data_points.joins(:student).where("students.id = ?", a.student.id)
      tmp[:count] = tmp[:points].count
    
      @students << tmp
    end
      

    respond_to do |format|
      format.js 
    end
      
  end
end
