class AddParametersToAnswer < ActiveRecord::Migration
  def change
    add_column :answers, :parameters, :text
  end
end
