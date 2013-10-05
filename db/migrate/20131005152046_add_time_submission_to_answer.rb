class AddTimeSubmissionToAnswer < ActiveRecord::Migration
  def change
    add_column :answers, :time_submission, :datetime
  end
end
