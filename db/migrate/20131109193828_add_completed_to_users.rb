class AddCompletedToUsers < ActiveRecord::Migration
  def change
    add_column :users, :completed, :text
  end
end
