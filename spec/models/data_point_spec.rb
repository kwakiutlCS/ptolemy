require 'spec_helper'

describe DataPoint do
  let(:student) {Student.create(name: "palerma")}
  let(:data) {DataPoint.create(x:3, y:43, student_id: student.id, activity_id: 2)}

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
  
  describe "student_id value" do
    it "is non-nil" do
      data.student_id = nil
      data.should_not be_valid
    end

    
    
  end

  describe "activity_id value" do
    it "is non-nil" do
      data.activity_id = nil
      data.should_not be_valid
    end

    it "is non-blank" do
      data.activity_id = ""
      data.should_not be_valid
    end

    
  end
  
end
