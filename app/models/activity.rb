class Activity < ActiveRecord::Base
  attr_accessible :code, :deadline,  :description
  
  validates :code, presence: true, uniqueness: {scope: :template_id}, length: {minimum: 3}
  validates :template_id, presence: true
  validates :user_id, presence: true
  
  
  belongs_to :template
  has_many :data_points, dependent: :destroy
  has_many :answers, dependent: :destroy
  
  has_many :filtered, class_name: "Activity", foreign_key: "filter_id"
  belongs_to :filter, class_name: "Activity"


  def filter?
    self.filtered.count > 0 ? true : false
  end
end
