class RenameStudentToUser < ActiveRecord::Migration
  def up
    rename_column :answers, :student_id, :user_id
    rename_column :data_points, :student_id, :user_id
  end

  def down
  end
end
