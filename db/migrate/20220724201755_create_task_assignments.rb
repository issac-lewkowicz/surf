class CreateTaskAssignments < ActiveRecord::Migration[7.0]
  def change
    create_table :task_assignments do |t|
      t.belongs_to :task, null: false, foreign_key: true
      t.belongs_to :member, null: false, foreign_key: true

      t.timestamps
    end
  end
end
