class CreatePets < ActiveRecord::Migration[6.1]
  def change
    create_table :pets do |t|
      t.string :name
      t.string :species
      t.integer :age
      t.belongs_to :owner 
      t.belongs_to :vet

      t.timestamps
    end
  end
end
