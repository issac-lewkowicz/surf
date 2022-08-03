class Board < ApplicationRecord
  belongs_to :team

  has_many :categories, dependent: :destroy

  
  validates :title, presence: true
  # validates :title, presence: true, uniqueness: { scope: :team,
  #   message: "Name must be unique" }
end
