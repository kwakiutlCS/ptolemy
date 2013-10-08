class CreateOpenQuestions < ActiveRecord::Migration
  def change
    create_table :open_questions do |t|
      t.integer :questionaire_id
      t.string :question

      t.timestamps
    end
  end
end
