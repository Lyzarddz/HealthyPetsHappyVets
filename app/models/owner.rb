class Owner < ApplicationRecord
    has_many :pets
    has_many :vets, through: :pets
end
