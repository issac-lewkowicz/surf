class SubtaskSerializer < ActiveModel::Serializer
  attributes :id, :title
  has_one :task
end
