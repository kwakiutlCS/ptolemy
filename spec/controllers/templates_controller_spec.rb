require 'spec_helper'


describe TemplatesController do
  it "redirects unsigned users" do
    get :index
    request.should redirect_to(new_user_session_path)
  end
end
