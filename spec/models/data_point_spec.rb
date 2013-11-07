require 'spec_helper'

describe DataPoint do
  let(:user) {FactoryGirl.create(:user)}
  let(:answer) {FactoryGirl.create(:answer, user_id: user.id)}
  let(:data) {FactoryGirl.create(:data_point, answer_id: answer.id)}

  describe "x value" do
    it "is non-nil" do
      data.x = nil
      data.should_not be_valid
    end

    it "is non-blank" do
      data.x = ""
      data.should_not be_valid
    end

    
    it "it can be a float" do
      data.x = 12.5
      data.should be_valid
    end

    it "it can be an integer" do
      data.x = 12
      data.should be_valid
    end
  end

  describe "y value" do
    it "is non-nil" do
      data.y = nil
      data.should_not be_valid
    end

    it "is non-blank" do
      data.y = ""
      data.should_not be_valid
    end


    it "it can be a float" do
      data.y = 12.5
      data.should be_valid
    end

    it "it can be an integer" do
      data.y = 12
      data.should be_valid
    end
  end
  
  

  describe "answer_id" do
    it "is non-nil" do
      data.answer_id = nil
      data.should_not be_valid
    end

    it "is non-blank" do
      data.answer_id = ""
      data.should_not be_valid
    end

    
  end
  
  it "is destroyed when user is destroyed" do
    user.destroy
    DataPoint.count.should == 0
  end
end
