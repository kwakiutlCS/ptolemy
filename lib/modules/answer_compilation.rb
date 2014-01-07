module AnswerCompilation

  def compile_answers
    model = {"1"=> "linear", "2"=> "quadratic", "3"=> "cubic", "4"=> "root", "5"=> "constant"}
    answers = @activity.answers.submited.includes(:data_points, :user).order("users.name")
      
    @students = []

    answers.each do |a|
      tmp = {}
      tmp[:answer] = a.id
      tmp[:name] = a.user.name
      tmp[:answers] = a.questions.zip(a.answers)
      if ((tmp[:answers][0][1] == "1" || tmp[:answers][0][1] == "2" || tmp[:answers][0][1] == "3") && a.parameters[0] == "0")
        tmp[:answers][0][1] = "constant"
      else
        tmp[:answers][0][1] = model[tmp[:answers][0][1]]
      end
      tmp[:start] = a.created_at
      tmp[:end] = a.time_submission
      tmp[:id] = a.user.id
      tmp[:points] = a.data_points
      tmp[:count] = tmp[:points].count
    
      @students << tmp
    end
  end
end
