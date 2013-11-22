class AddFilterToTemplates < ActiveRecord::Migration
  def change
    add_column :templates, :filter, :integer
  end
end
