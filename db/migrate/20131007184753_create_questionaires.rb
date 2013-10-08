class CreateQuestionaires < ActiveRecord::Migration
  def change
    create_table :questionaires do |t|
      t.integer :user_id
      t.string :code
      t.datetime :deadline

      t.timestamps
    end
  end
end
