class Record < ApplicationRecord
    belongs_to :pet

    validates :date, presence: true
    validates :pet_id, presence: true
end
