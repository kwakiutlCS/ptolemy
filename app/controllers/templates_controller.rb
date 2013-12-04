class TemplatesController < ApplicationController
  before_filter :authenticate_user!, except:[:show]
  before_filter :set_cache_buster, only: [:index]

  def index
    @templates = Template.where(filter_id: nil)

  end


  def show
    if current_user && current_user.role == "teacher"
      @role = "teacher"
      @template = Template.find(params[:id])

      
      @activity = Activity.new
      
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
