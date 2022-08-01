class BoardSerializer < ActiveModel::Serializer
  attributes :id, :title
  has_one :team
  has_many :categories
end
