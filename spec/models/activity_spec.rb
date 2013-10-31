require 'spec_helper'

describe Activity do
  let(:activity) {FactoryGirl.create(:activity)}

  describe "code" do
    it "is non-nil" do
      activity.code = nil
      activity.should_not be_valid
    end

    it "is non-blank" do
      activity.code = ""
      activity.should_not be_valid
    end

    it "is at least 3 chars" do
      activity.code = "ew"
      activity.should_not be_valid
    end

    it "is unique for a given template" do
      x = FactoryGirl.build(:activity, code: activity.code, template_id: activity.template_id)
      x.should_not be_valid
    end

    it "can be non unique for a different template" do
      x = FactoryGirl.build(:activity, code: activity.code, template_id: activity.template_id+1)
      x.should be_valid
    end
  
  end

  describe "deadline" do
    it "can be nil" do
      activity.deadline = nil
      activity.should be_valid
    end
  end

  describe "template_id" do
    it "can't be nil" do
      activity.template_id = nil
      activity.should_not be_valid
    end

    it "may be non-unique" do
      x = FactoryGirl.build(:activity, template_id: activity.template_id)
      x.should be_valid
    end
  
  end

   describe "user_id" do
    it "can't be nil" do
      activity.user_id = nil
      activity.should_not be_valid
    end

    it "may be non-unique" do
      x = FactoryGirl.build(:activity, user_id: activity.user_id)
      x.should be_valid
    end
  
  end


  
end
