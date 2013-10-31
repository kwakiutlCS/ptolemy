require 'spec_helper'

describe User do
  
  let(:teacher) {FactoryGirl.create(:user)}

  describe "name" do
    it "is non-nil" do
      teacher.name = nil
      teacher.should_not be_valid
    end

    it "is non-blank" do
      teacher.name = ""
      teacher.should_not be_valid
    end

    it "is unique" do
      t = FactoryGirl.build(:user, name: teacher.name)
      t.should_not be_valid
    end
  end

  


  describe "role" do
    
    
    it "is non-unique" do
      t = FactoryGirl.build(:user)
      t.should be_valid
    end
    

  end


end
