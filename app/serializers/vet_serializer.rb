class VetSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :pets
  has_many :owners, through: :pets
end
