class RemoveTitleFromActivity < ActiveRecord::Migration
  def up
    remove_column :activities, :title
  end

  def down
    add_column :activities, :title, :string
  end
end
