class ChangeAlteredToText < ActiveRecord::Migration[6.1]
  def change
    change_column :records, :altered, :text 
  end
end
