class TemplatesController < ApplicationController
  before_filter :authenticate_user!
  
  def index
    @templates = Template.all

  end


  def show
    @template = Template.find(params[:id])

    @activity = Activity.new
  end


end
