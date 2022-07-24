class CreateTeams < ActiveRecord::Migration[7.0]
  def change
    create_table :teams do |t|
      t.belongs_to :member, null: false, foreign_key: true
      t.string :team_name

      t.timestamps
    end
  end
end
