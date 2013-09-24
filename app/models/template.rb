class Template < ActiveRecord::Base
  attr_accessible :url

  has_many :activities
end
