class RecordSerializer < ActiveModel::Serializer
  attributes :id, :vaccine, :prevention, :altered
end
