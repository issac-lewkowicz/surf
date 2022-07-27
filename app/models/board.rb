class Board < ApplicationRecord
  belongs_to :team

  has_many :categories, dependent: :destroy
end
