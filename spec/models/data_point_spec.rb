require 'spec_helper'

describe DataPoint do
  let(:user) {FactoryGirl.create(:user)}
  let(:data) {FactoryGirl.create(:data_point, user_id: user.id)}

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
  
  describe "user_id value" do
    it "is non-nil" do
      data.user_id = nil
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
