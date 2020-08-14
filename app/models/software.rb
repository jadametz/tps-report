class Software < ApplicationRecord
  validates :name, presence: true, uniqueness: { scope: :org }
  validates :org, presence: true
  validates :full_name, presence: true, uniqueness: true

  # we don't have after_save_commit from Rails 6
  # this will not fire on updates
  after_create_commit :reconcile_immediately

  # remove whitespace server-side to be sure
  # TODO: This abuses the validation to modify the object, we should just override the attribute_writer
  before_validation :remove_possible_whitespace

  def reconcile!
    reconcile_with_github
  end

  private

  def remove_possible_whitespace
    # ignores nils or values that don't support strip!()
    attributes.each { |_, value| value.try(:strip!) }
  end

  def reconcile_immediately
    ReconcileSoftwareJob.perform_later(self)
  end

  def reconcile_with_github
    updates = {}
    # TODO move this github_client into a client wrapper in lib
    releases = Rails.application.config.github_client.list_releases(full_name).reject { |rel| rel.prerelease == true }
    unless releases.empty?
      in_use_release = releases.find { |release| release.name == self.in_use_release }
      updates[:in_use_release_date] = in_use_release.published_at
      updates[:latest_release] = releases.first.name
      updates[:latest_release_date] = releases.first.published_at
    else
      # if we don't have releases, check for tags
      tags = Rails.application.config.github_client.tags(full_name)
      # TODO: filter for "*pre*" tags
      unless tags.empty?
        updates[:latest_release] = tags.first.name
        begin
          latest_tag = Rails.application.config.github_client.tag(full_name, tags.first.commit.sha)
          updates[:latest_release_date] = latest_tag.tagger.date
        # TODO fix this, yuck
        rescue Octokit::NotFound
          # may be a lightweight tag, ie just a ref
          latest_tag = Rails.application.config.github_client.get(tags.first.commit.url)
          updates[:latest_release_date] = latest_tag.committer.date
        end
      end
    end
    unless updates.empty?
      self.update(updates)
      logger.info "Reconciled #{full_name.inspect}(#{id}) with: #{saved_changes}"
    end
  end
end
