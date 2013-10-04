require 'spec_helper'

describe Answer do
  let(:activity) {Activity.create(code: "rwewre", deadline: Date.today+6.days, template_id: 1, user_id: 1, title: "alkjg")}
  let(:student) {Student.create(name: "palerma")}
  let(:answer) {Answer.create(activity_id: activity.id, student_id: student.id, questions: ["ola", "laksfjad", "lakgj"], answers: ["kalsgj", "", "laksjg"])}

  describe "activity_id" do
    it "is non-nil" do
      answer.activity_id = nil
      answer.should_not be_valid
    end

    it "is non-blank" do
      answer.activity_id = ""
      answer.should_not be_valid
    end
  end

  describe "student_id" do
    it "is non-nil" do
      answer.student_id = nil
      answer.should_not be_valid
    end

    it "is non-blank" do
      answer.student_id = ""
      answer.should_not be_valid
    end
  end

  describe "questions" do
    it "is non-nil" do
      answer.questions = nil
      answer.should_not be_valid
    end

    it "is non-blank" do
      answer.questions = ""
      answer.should_not be_valid
    end
  end

  describe "answers" do
    it "is non-nil" do
      answer.answers = nil
      answer.should_not be_valid
    end

    it "is non-blank" do
      answer.answers = ""
      answer.should_not be_valid
    end

    it "has a length non smaller to questions" do
      answer.answers = ["kalsgj", "laksjg"]
      answer.should_not be_valid
    end

    it "has a length non larger to questions" do
      answer.answers = ["kalsgj","","", "laksjg"]
      answer.should_not be_valid
    end

    it "has a length equal to questions" do
      answer.answers = ["kalsgj","", "laksjg"]
      answer.should be_valid
    end
  end
end
