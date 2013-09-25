class DataPoint < ActiveRecord::Base
  attr_accessible :activity_id, :name, :x, :y

  validates :x, presence: true
  validates :y, presence: true
  validates :activity_id, presence: true
  validates :name, presence: true
  
end
