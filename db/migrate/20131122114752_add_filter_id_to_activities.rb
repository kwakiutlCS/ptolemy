class AddFilterIdToActivities < ActiveRecord::Migration
  def change
    add_column :activities, :filter_id, :integer
  end
end
