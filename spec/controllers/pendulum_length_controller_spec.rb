require 'spec_helper'

describe PendulumLengthController do
  describe "get access to pendulum_length" do
    it "is prevented" do
      get :index
      response.should redirect_to(root_path)
    end
  end
end
