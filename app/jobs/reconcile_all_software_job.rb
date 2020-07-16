class ReconcileAllSoftwareJob < ApplicationJob
  queue_as :default

  def perform
    Software.in_batches(of: 25).each_record(&:reconcile!)
  end
end
