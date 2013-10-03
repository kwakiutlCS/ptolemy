require 'spec_helper'

describe Template do
  let(:template) {Template.create(url: "/stat", title:"thermo", description:"my first attempt")}

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
      t = Template.new(url: template.url.upcase, title:"asklhgdsg", description:"randowm stuff")
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

    it "is unique" do
      t = Template.new(url: "nosfdj" , title:"other2", description: template.description.capitalize)
      p template.description
      t.should_not be_valid
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
      t = Template.new(url: "other", title: template.title.upcase, description:"randowm stuff")
      p template.title
      t.should_not be_valid
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
