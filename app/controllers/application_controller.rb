class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :set_user_language
  
  
  def after_sign_in_path_for(resource) 
    session[:student] = current_user.id if current_user.role == "student"
    session[:activity] = nil
    session[:answer] = nil
    session[:url] = nil
    teacher_path(current_user.id)
  end

  
  
  private
  def set_user_language
    I18n.locale = http_accept_language.compatible_language_from(I18n.available_locales)
    #I18n.locale = "pt-PT"
  end

  
  def set_cache_buster
    response.headers["Cache-Control"] = "no-cache, no-store, max-age=0, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "Fri, 01 Jan 1990 00:00:00 GMT"
  end
  
end
