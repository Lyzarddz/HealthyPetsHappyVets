class PetSerializer < ActiveModel::Serializer
  attributes :id, :name, :species, :age
end
