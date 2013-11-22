class Template < ActiveRecord::Base
  attr_accessible :url, :description, :title

  validates :url, presence: true, uniqueness: {case_sensitive: false}
  validates :description, presence: true
  validates :title, presence: true, uniqueness: {case_sensitive: false}


  has_many :activities, dependent: :destroy

  has_many :filtered, class_name: "Template", foreign_key: "filter_id"
  belongs_to :filter, class_name: "Template"
end
