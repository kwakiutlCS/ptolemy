class DataPoint < ActiveRecord::Base
  attr_accessible :activity_id, :student_id, :x, :y

  validates :x, presence: true
  validates :y, presence: true
  validates :activity_id, presence: true
  validates :student_id, presence: true
  
  belongs_to :student
  belongs_to :activity
end
