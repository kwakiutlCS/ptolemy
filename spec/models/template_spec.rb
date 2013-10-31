require 'spec_helper'

describe Template do
  let(:template) {FactoryGirl.create(:template)}

  describe "url" do
    it "is non-nil" do 
      template.url = nil
      template.should_not be_valid
    end
    
    it "is non-blank" do 
      template.url = ""
      template.should_not be_valid
    end

    it "is unique" do
      t = FactoryGirl.build(:template, url: template.url)
      t.should_not be_valid
    end
  end


  describe "description" do
    it "is non-nil" do 
      template.description = nil
      template.should_not be_valid
    end
    
    it "is non-blank" do 
      template.description = ""
      template.should_not be_valid
    end

    it "is non unique" do
      t = FactoryGirl.build(:template, description: template.description)
      t.should be_valid
    end
  end

  describe "title" do
    it "is non-nil" do 
      template.title = nil
      template.should_not be_valid
    end
    
    it "is non-blank" do 
      template.title = ""
      template.should_not be_valid
    end

    it "is unique" do
      t = FactoryGirl.build(:template, title: template.title)
      t.should_not be_valid
    end
  end





  describe "#destroy" do
    it "deletes all associated activities" do
      id = template.id
      FactoryGirl.create(:activity, template_id: id)
      template.destroy
      x = Activity.where(template_id: id).count
      x.should == 0
    end
  end
end
