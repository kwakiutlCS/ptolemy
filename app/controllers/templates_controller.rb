class TemplatesController < ApplicationController
  before_filter :authenticate_user!, except:[:show]
  
  def index
    @templates = Template.all

  end


  def show
    if current_user && current_user.role == "teacher"
      @role = "teacher"
      @template = Template.find(params[:id])

      @activity = Activity.new
      @activity.title = @template.title
    else
      @role = "student"
      @t_id = params[:id]
      
    end
   
    respond_to do |format|
        format.js 
      format.html
    end
    
  end


  
end
