class Software < ApplicationRecord
  validates :name, presence: true
  validates :org, presence: true
  validates :full_name, presence: true

  # we don't have after_save_commit from Rails 6
  # this will not fire on updates
  after_create_commit :reconcile_immediately

  def reconcile!
    logger.info "Reconciling #{id} - #{full_name.inspect}"
    reconcile_with_github
  end

  private

  def reconcile_immediately
    ReconcileSoftware.perform_now(self)
  end

  def reconcile_with_github
    #repo = Rails.application.config.github_client.repo full_name
    #if full_name != repo.full_name
    #  update_attributes(full_name: repo.full_name)
    #end
    releases = Rails.application.config.github_client.list_releases full_name
    #tags = Rails.application.config.github_client.list_refs full_name

  end

end
