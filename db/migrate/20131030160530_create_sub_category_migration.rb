class CreateSubCategoryMigration < ActiveRecord::Migration
  def up
    SubCategory.create_translation_table!({
      title: :string
    },{
      migrate_data: true
                                          })                                        
  end

  def down
    SubCategory.drop_translation_table! migrate_data: true
  end
end
