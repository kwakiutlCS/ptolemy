# -*- coding: utf-8 -*-
require 'spec_helper'

describe Student do
  let(:student) {Student.create(name: "palerma")}

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
      a= Student.new(name: "palerma")
      a.should be_valid
    end
  end
end
