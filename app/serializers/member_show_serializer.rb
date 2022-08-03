class MemberShowSerializer < MemberSerializer

  has_many :owned_teams
  has_many :teams
end
