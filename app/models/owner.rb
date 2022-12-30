class Owner < ApplicationRecord
    has_many :pets
    has_many :vets, through: :pets
    has_many :records, through: :pets

    has_secure_password

    validates :username, presence: true, uniqueness: :true
end
