class CreateReports < ActiveRecord::Migration[7.1]
  def change
    create_table :reports do |t|
      t.string :title
      t.text :body
      t.float :lat
      t.float :lng
      t.datetime :time

      t.timestamps
    end
  end
end
