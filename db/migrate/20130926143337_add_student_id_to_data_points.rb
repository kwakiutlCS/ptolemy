class AddStudentIdToDataPoints < ActiveRecord::Migration
  def change
    add_column :data_points, :student_id, :integer
    remove_column :data_points, :name
  end
end
