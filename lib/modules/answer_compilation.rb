module AnswerCompilation

  def compile_answers
    answers = @activity.answers.submited.includes(:data_points, :user).order("users.name")
      
    @students = []

    answers.each do |a|
      tmp = {}
      tmp[:answer] = a.id
      tmp[:name] = a.user.name
      tmp[:answers] = a.questions.zip(a.answers)
      tmp[:start] = a.created_at
      tmp[:end] = a.time_submission
      tmp[:id] = a.user.id
      tmp[:points] = a.data_points
      tmp[:count] = tmp[:points].count
    
      @students << tmp
    end
  end
end
