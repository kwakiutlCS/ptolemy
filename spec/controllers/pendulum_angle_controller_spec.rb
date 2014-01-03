require 'spec_helper'

describe PendulumAngleController do
  describe "get access to pendulum_angle" do
    it "is prevented" do
      get :index
      response.should redirect_to(root_path)
    end
  end
end
