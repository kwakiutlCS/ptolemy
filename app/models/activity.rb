class Activity < ActiveRecord::Base
  attr_accessible :code, :deadline, :template_id
  
  belongs_to :template
  has_many :data_points
end
