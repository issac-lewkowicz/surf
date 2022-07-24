class Team < ApplicationRecord
  belongs_to :member

  has_many :team_assignments, dependent: :destroy
  has_many :members, through: :team_assignments

  validates :team_name, presence: true, uniqueness: true
  
end
