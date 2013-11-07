class RemoveActivityIdFromDataPoint < ActiveRecord::Migration
  def up
    remove_column :data_points, :activity_id
  end

  def down
    add_column :data_points, :activity_id, :integer
  end
end
