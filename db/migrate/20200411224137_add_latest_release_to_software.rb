class AddLatestReleaseToSoftware < ActiveRecord::Migration[5.2]
  def change
    add_column :softwares, :latest_release, :string
    add_column :softwares, :latest_release_date, :date
  end
end
