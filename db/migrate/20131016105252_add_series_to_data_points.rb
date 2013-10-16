class AddSeriesToDataPoints < ActiveRecord::Migration
  def change
    add_column :data_points, :series, :string
  end
end
