class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.belongs_to :category, null: false, foreign_key: true
      t.string :title
      t.string :description
      t.datetime :due_date

      t.timestamps
    end
  end
end
