class AddActivityIdToDataPoint < ActiveRecord::Migration
  def change
    add_column :data_points, :activity_id, :integer
  end
end
