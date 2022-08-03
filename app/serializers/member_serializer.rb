class MemberSerializer < ActiveModel::Serializer
  attributes :id, :username, :member_name, :email, :image_url
end
