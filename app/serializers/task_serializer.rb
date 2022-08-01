class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :due_date
  has_one :category
  has_many :subtasks
  has_many :labels
  has_many :members
end
