class RecordSerializer < ActiveModel::Serializer
  attributes :id, :vaccine, :prevention, :altered

  belongs_to :pet
end
