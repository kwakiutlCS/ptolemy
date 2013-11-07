class AddSubmitedToAnswer < ActiveRecord::Migration
  def change
    add_column :answers, :submited, :boolean
  end
end
