class SubCategory < ActiveRecord::Base
  attr_accessible  :title

  belongs_to :category
end
