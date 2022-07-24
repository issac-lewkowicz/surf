class TaskLabelSerializer < ActiveModel::Serializer
  attributes :id
  has_one :label
  has_one :task
end
