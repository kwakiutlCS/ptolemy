class CreateDataPoints < ActiveRecord::Migration
  def change
    create_table :data_points do |t|
      t.float :x
      t.float :y
      t.integer :activity_id
      t.string :name

      t.timestamps
    end
  end
end
