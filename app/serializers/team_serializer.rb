class TeamSerializer < ActiveModel::Serializer
  attributes :id, :team_name
  has_one :member, key: :owner
  has_many :members
end
