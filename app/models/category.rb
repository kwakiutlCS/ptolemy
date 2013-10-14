class Category < ActiveRecord::Base
  attr_accessible :title

  has_many :sub_categories, dependent: :destroy
end
