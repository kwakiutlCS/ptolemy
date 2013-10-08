class Questionaire < ActiveRecord::Base
  attr_accessible :code, :deadline, :user_id
end
