class Template < ActiveRecord::Base
  attr_accessible :url, :description, :title

  validates :url, presence: true, uniqueness: {case_sensitive: false}
  validates :description, presence: true, uniqueness: {case_sensitive: false}
  validates :title, presence: true, uniqueness: {case_sensitive: false}


  has_many :activities, dependent: :destroy
end
