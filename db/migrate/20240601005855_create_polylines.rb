class CreatePolylines < ActiveRecord::Migration[7.1]
  def change
    create_table :polylines do |t|
      t.string :encoding

      t.timestamps
    end
  end
end
