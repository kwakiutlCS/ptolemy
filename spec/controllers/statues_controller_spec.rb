require 'spec_helper'

describe StatuesController do
  describe "get access to statues" do
    it "is prevented" do
      get :index
      response.should redirect_to(root_path)
    end
  end
end
