class AddFieldsToTemplate < ActiveRecord::Migration
  def change
    add_column :templates, :title, :string
    add_column :templates, :description, :string
  end
end
