class BoardSerializer < ActiveModel::Serializer
  attributes :id, :title
  has_one :team
end
