class PendulumFilterController < ApplicationController

  def index
    if session[:url] != request.path || session[:activity] == nil
      redirect_to root_path
    end

    a = Activity.find(session[:activity])
    @filtered = []
     
    tmp = []
    a.filtered.includes(:template).each do |i|
      tmp << i
      if tmp.count == 2
        @filtered << tmp
        tmp = []
      end
    end
    @filtered << tmp if tmp.count > 0
    
  end


  def filter
    act = Activity.find(params[:id])
    t = Template.find(act.template_id)
    a = Answer.find(session[:answer])
    
    session[:template] = t.id
    session[:activity] = act.id
    session[:url] = t.url
    a.activity_id = act.id
    a.save
    redirect_to t.url
  end
end
