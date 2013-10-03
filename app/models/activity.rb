class Activity < ActiveRecord::Base
  attr_accessible :code, :deadline, :template_id, :user_id
  
  validates :code, presence: true, uniqueness: {case_sensitive: false}, length: {minimum: 3}
  validates :template_id, presence: true
  validates :user_id, presence: true

  belongs_to :template
  has_many :data_points, dependent: :destroy
end
