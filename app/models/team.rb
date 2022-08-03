class Team < ApplicationRecord
  belongs_to :member

  has_many :team_assignments, dependent: :destroy
  has_many :members, through: :team_assignments

  has_many :boards, dependent: :destroy


  validates :team_name, presence: true
  #to be tested:
  # validates :team_name, presence: true, uniqueness: { scope: :member,
  #   message: "A team name must be unique" }


end
