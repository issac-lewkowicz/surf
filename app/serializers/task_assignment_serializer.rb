class TaskAssignmentSerializer < ActiveModel::Serializer
  attributes :id
  has_one :task
  has_one :member
end
