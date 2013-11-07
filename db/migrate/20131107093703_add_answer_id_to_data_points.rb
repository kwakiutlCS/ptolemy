class AddAnswerIdToDataPoints < ActiveRecord::Migration
  def change
    add_column :data_points, :answer_id, :integer
  end
end
