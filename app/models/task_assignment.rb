class TaskAssignment < ApplicationRecord
  belongs_to :task
  belongs_to :member
end
