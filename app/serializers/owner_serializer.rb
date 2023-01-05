class OwnerSerializer < ActiveModel::Serializer
  attributes :id, :username, :pets

  has_many :pets
  has_many :vets, through: :pets
end
