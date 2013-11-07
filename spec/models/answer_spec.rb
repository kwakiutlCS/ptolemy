require 'spec_helper'

describe Answer do
  let(:activity) {FactoryGirl.create(:activity)}
  let(:student) {FactoryGirl.create(:user)}
  let(:answer) {FactoryGirl.create(:answer, user_id: student.id, activity_id: activity.id)}

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

  describe "user_id" do
    it "is non-nil" do
      answer.user_id = nil
      answer.should_not be_valid
    end

    it "is non-blank" do
      answer.user_id = ""
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

  describe "data_points" do
    it "are destroyed when answer is destroyed" do
      d = FactoryGirl.create(:data_point,  answer_id: answer.id)
      answer.destroy
      DataPoint.count.should == 0
    end


    
  end
end
