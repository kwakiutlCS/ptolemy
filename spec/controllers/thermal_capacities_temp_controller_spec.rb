require 'spec_helper'

describe ThermalCapacitiesTempController do
  describe "get access to thermal_capacities" do
    it "is prevented" do
      get :index
      response.should redirect_to(root_path)
    end
  end
end
