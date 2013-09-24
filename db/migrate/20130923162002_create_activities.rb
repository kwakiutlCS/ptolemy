class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.string :code
      t.datetime :deadline
      t.integer :template_id

      t.timestamps
    end
  end
end
