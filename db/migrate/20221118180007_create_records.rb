class CreateRecords < ActiveRecord::Migration[6.1]
  def change
    create_table :records do |t|
      t.string :vaccine
      t.string :prevention
      t.boolean :altered
      t.belongs_to :pet, index: true

      t.timestamps
    end
  end
end
