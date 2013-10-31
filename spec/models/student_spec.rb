# -*- coding: utf-8 -*-
require 'spec_helper'

describe Student do
  let(:student) {FactoryGirl.create(:student)}

  describe "name" do
    it "is non-nil" do
      student.name = nil
      student.should_not be_valid
    end
    
    it "is at least 2 chars long" do
      student.name = "R"
      student.should_not be_valid
    end

    it "is not blank" do
      student.name = ""
      student.should_not be_valid
    end

    it "is at most 30 chars long" do
      student.name = "qwertyuiopçlkjhgfdsazxcvbnmpoiu"
      student.should_not be_valid
    end

    it "is not unique" do
      a= FactoryGirl.build(:student)
      a.should be_valid
    end
  end


  describe "#destroy" do
    it "removes student's data points" do
      d = FactoryGirl.create(:data_point, student_id: student.id)
      student.destroy
      x = DataPoint.where(id: d.id).count
      x.should == 0
    end
  end
end
