class AddSubCategoryToTemplates < ActiveRecord::Migration
  def change
    add_column :templates, :sub_category_id, :integer
  end
end
