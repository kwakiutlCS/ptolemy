class DataPoint < ActiveRecord::Base
  attr_accessible :x, :y, :series

  validates :x, presence: true
  validates :y, presence: true
  validates :answer_id, presence: true
  
  belongs_to :answer
end
