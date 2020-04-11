class AddInUseReleaseToSoftware < ActiveRecord::Migration[5.2]
  def change
    add_column :softwares, :in_use_release, :string
    add_column :softwares, :in_use_release_date, :date
  end
end
