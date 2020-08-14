class ReconcileSoftwareJob < ApplicationJob
  queue_as :default

  def perform(software)
    software.reconcile!
  end
end
