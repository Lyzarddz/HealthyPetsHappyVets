class RecordSerializer < ActiveModel::Serializer
  attributes :id, :vaccine, :prevention, :altered, :pet, :date

  belongs_to :pet
end
