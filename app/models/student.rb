class Student < ActiveRecord::Base
  attr_accessible :name

  validates :name, presence: true, length: {maximum: 30, minimum: 2}

  has_many :data_points, dependent: :destroy
  has_many :answers, dependent: :destroy
end
