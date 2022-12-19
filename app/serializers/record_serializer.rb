class RecordSerializer < ActiveModel::Serializer
  attributes :id, :vaccine, :prevention, :altered, :pet

  belongs_to :pet
end
