class SubCategory < ActiveRecord::Base
  translates :title
  
  attr_accessible  :title

  belongs_to :category
end
