class Pet < ApplicationRecord
  belongs_to :owner
  belongs_to :vet
  has_many :records
end
