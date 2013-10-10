class StudentsController < ApplicationController


  def destroy
    p params

    s = Student.find(params[:id])
    s.destroy
    
    @activity = current_user.activities.where(id: params[:activity_id]).first
    
    answers = @activity.answers.includes(:student).order("students.name")
      
    @students = []

    answers.each do |a|
      tmp = {}
      tmp[:name] = a.student.name
      tmp[:answers] = a.questions.zip(a.answers)
      tmp[:start] = a.student.created_at
      tmp[:end] = a.time_submission
      tmp[:id] = a.student.id
      tmp[:count] = @activity.data_points.joins(:student).where("students.id = ?", a.student.id).count
    
      @students << tmp
    end
      

    respond_to do |format|
      format.js 
    end
      
  end
end
