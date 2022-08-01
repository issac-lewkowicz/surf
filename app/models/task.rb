class Task < ApplicationRecord
  belongs_to :category

  has_many :subtasks, dependent: :destroy

  has_many :task_assignments, dependent: :destroy
  has_many :members, through: :task_assignments

  has_many :task_labels
  has_many :labels, through: :task_labels
end
