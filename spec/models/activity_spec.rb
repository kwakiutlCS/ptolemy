require 'spec_helper'

describe Activity do
  let(:activity) {Activity.create(code: "rwewre", deadline: Date.today+6.days, template_id: 1, user_id: 1, title: "thermo lasdkjf")}

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

    it "is unique" do
      x = Activity.new(code: activity.code, deadline: Date.today, template_id: 12, user_id: 2, title: "thermo lasdkjf")
      x.should_not be_valid
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
      x = Activity.new(code: "rwewrere", deadline: Date.today, template_id: activity.template_id, user_id: 3, title: "thermo lasdkjf")
      x.should be_valid
    end
  
  end

   describe "user_id" do
    it "can't be nil" do
      activity.user_id = nil
      activity.should_not be_valid
    end

    it "may be non-unique" do
      x = Activity.new(code: "rwewrere", deadline: Date.today, template_id: 1, user_id: activity.user_id, title: "thermo lasdkjf")
      x.should be_valid
    end
  
  end


  describe "title" do
    it "can't be nil" do
      activity.title = nil
      activity.should_not be_valid
    end

    it "may be non unique" do
      a = Activity.new(code: "rwew", deadline: Date.today+6.days, template_id: 1, user_id: 1, title: activity.title)
      a.should be_valid
    end
  end
end
