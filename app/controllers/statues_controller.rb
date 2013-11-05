class StatuesController < ApplicationController

  def index
    if session[:url] != request.path || session[:activity] == nil
      redirect_to root_path
    end
    
    @user = user_signed_in?
  end


  def add_prediction
    session[:prediction] = params[:mass]

    respond_to do |format|
      format.js
    end
  end
end
