class MemberSerializer < ActiveModel::Serializer
  attributes :id, :username, :member_name, :email, :password_digest, :image_url
end
