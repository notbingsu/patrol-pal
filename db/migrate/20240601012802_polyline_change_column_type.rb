class PolylineChangeColumnType < ActiveRecord::Migration[7.1]
  def change
    change_column :polylines, :encoding, :text
  end
end
