class TeamAssignmentSerializer < ActiveModel::Serializer
  attributes :id
  has_one :team
  has_one :member
end
