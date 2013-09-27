class Template < ActiveRecord::Base
  attr_accessible :url

  validates :url, presence: true

  has_many :activities, dependent: :destroy
end
