class CreateSoftwares < ActiveRecord::Migration[5.2]
  def change
    create_table :softwares do |t|
      t.string :name, null: false
      t.string :org, null: false
      t.string :full_name, null: false

      t.timestamps
    end
  end
end
