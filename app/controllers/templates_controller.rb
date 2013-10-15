class TemplatesController < ApplicationController
  before_filter :authenticate_user!, except:[:show]
  
  def index
    @templates = Template.all

  end


  def show
    if current_user && current_user.role == "teacher"
      @template = Template.find(params[:id])

      @activity = Activity.new
      @activity.title = @template.title
    else
      
      @t_id = params[:id]
      respond_to do |format|
        format.js 
      end
    end
  end


  
end
