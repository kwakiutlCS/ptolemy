require 'spec_helper'

describe PendulumMassController do
  describe "get access to pendulum_mass" do
    it "is prevented" do
      get :index
      response.should redirect_to(root_path)
    end
  end
end
