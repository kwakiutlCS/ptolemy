class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :set_user_language

  def after_sign_in_path_for(resource) 
    teacher_path(current_user.id)
  end

  private
  def set_user_language
    I18n.locale = "pt-PT"
  end
  
end
