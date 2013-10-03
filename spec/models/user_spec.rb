require 'spec_helper'

describe User do
  
  let(:teacher) {User.create(name: "palerma",password:"password")}

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
      t = User.new(name: teacher.name, password:"kskadfj")
      p t.valid?
      t.should_not be_valid
    end
  end

  


  describe "role" do
    
    
    it "is non-unique" do
      t = User.new(name: "palerma3", password: teacher.password)
      t.should be_valid
    end
    

  end


end
