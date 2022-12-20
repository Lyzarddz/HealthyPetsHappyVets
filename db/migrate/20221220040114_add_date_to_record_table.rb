class AddDateToRecordTable < ActiveRecord::Migration[6.1]
  def change
    add_column :records, :date, :text
  end
end
