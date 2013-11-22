class RenameFilter < ActiveRecord::Migration
  def up
    rename_column :templates, :filter, :filter_id
  end

  def down
  end
end
