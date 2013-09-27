require 'spec_helper'

describe Template do
  let(:template) {Template.create(url: "/stat")}

  describe "url" do
    it "is non-nil" do 
      template.url = nil
      template.should_not be_valid
    end
    
    it "is non-blank" do 
      template.url = ""
      template.should_not be_valid
    end
  end

  describe "#destroy" do
    it "deletes all associated activities" do
      id = template.id
      a = Activity.create(code: "342", deadline:Date.today+6.days, template_id:template.id)
      template.destroy
      x = Activity.where(template_id: id).count
      x.should == 0
    end
  end
end
