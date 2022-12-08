class ChangeRecordsTablePetId < ActiveRecord::Migration[6.1]
  def change
    rename_column :records, :pets_id, :pet_id
  end
end
