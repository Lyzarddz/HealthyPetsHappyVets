class RecordSerializer < ActiveModel::Serializer
  attributes :id, :vaccine, :prevention, :altered, :pet, :notes, :date

  belongs_to :pet
end
