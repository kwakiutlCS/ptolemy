class RemoveUserIdFromDataPoint < ActiveRecord::Migration
  def up
    remove_column :data_points, :user_id
  end

  def down
    add_column :data_points, :user_id, :integer
  end
end
