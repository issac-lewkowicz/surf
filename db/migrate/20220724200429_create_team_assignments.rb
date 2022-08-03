class CreateTeamAssignments < ActiveRecord::Migration[7.0]
  def change
    create_table :team_assignments do |t|
      t.belongs_to :team, null: false, foreign_key: true
      t.belongs_to :member, null: false, foreign_key: true

      t.timestamps
    end
  end
end
