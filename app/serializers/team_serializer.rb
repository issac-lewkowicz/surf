class TeamSerializer < ActiveModel::Serializer
  attributes :id, :team_name
  has_one :member
end