class AddImgToTemplates < ActiveRecord::Migration
  def change
    add_column :templates, :img, :string
  end
end
