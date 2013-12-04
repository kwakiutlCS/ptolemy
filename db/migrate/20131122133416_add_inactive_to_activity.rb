class AddInactiveToActivity < ActiveRecord::Migration
  def change
    add_column :activities, :inactive, :boolean
  end
end
