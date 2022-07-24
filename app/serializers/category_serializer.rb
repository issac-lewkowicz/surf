class CategorySerializer < ActiveModel::Serializer
  attributes :id, :title
  has_one :board
end
