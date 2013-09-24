class CreateTemplates < ActiveRecord::Migration
  def change
    create_table :templates do |t|
      t.string :url

      t.timestamps
    end
  end
end
