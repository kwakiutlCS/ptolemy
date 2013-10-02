class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.text :questions
      t.text :answers
      t.integer :activity_id
      t.integer :student_id

      t.timestamps
    end
  end
end
