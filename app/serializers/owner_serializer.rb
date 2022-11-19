class OwnerSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest

  has_many :pets
  has_many :vets, through: :pets
end
