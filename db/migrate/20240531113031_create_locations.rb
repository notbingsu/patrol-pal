class CreateLocations < ActiveRecord::Migration[7.1]
  def change
    create_table :locations do |t|
      t.string :address
      t.float :ltd
      t.float :lng

      t.timestamps
    end
    add_index :locations, :ltd
    add_index :locations, :lng
  end
end
