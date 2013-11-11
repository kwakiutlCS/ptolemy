require 'spec_helper'

describe User do
  
  let(:teacher) {FactoryGirl.create(:user)}

  describe "login" do
    it "is non-nil" do
      teacher.login = nil
      teacher.should_not be_valid
    end

    it "is non-blank" do
      teacher.login = ""
      teacher.should_not be_valid
    end

    it "is unique" do
      t = FactoryGirl.build(:user, login: teacher.login)
      t.should_not be_valid
    end
  end

  
  describe "name" do
    it "is non-nil for student" do
      student = FactoryGirl.build(:user, role: "student")
      student.name = nil
      student.should_not be_valid
    end

    it "is non-blank for student" do
      student = FactoryGirl.build(:user, role: "student")
      student.name = ""
      student.should_not be_valid
    end

    it "can be nil for teachers" do
      teacher.name = nil
      teacher.should be_valid
    end
  end

  describe "role" do
    
    
    it "is non-unique" do
      t = FactoryGirl.build(:user)
      t.should be_valid
    end
    

  end


end
