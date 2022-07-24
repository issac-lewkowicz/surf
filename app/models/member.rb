class Member < ApplicationRecord
  has_secure_password

  has_many :team_assignments, dependent: :destroy
  has_many :teams, through: :team_assignments
  has_many :owned_teams, class_name: "Team"

  has_many :task_assignments, dependent: :destroy
  has_many :tasks, through: :task_assignments

  
  validates :username, presence: true, uniqueness: true
end
