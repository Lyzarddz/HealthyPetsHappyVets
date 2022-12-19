class PetSerializer < ActiveModel::Serializer
  attributes :id, :name, :species, :age, :vet, :owner, :records

  has_many :records
  belongs_to :owner
end
