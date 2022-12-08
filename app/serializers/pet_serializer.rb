class PetSerializer < ActiveModel::Serializer
  attributes :id, :name, :species, :age

  has_many :records
  belongs_to :owner
end
