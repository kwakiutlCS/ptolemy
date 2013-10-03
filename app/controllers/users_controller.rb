class UsersController < ApplicationController
  before_filter :authenticate_user!

  def show
    if current_user.id != params[:id]
      redirect_to new_user_session_path
    end
    @user = User.find(params[:id])
  end

end
