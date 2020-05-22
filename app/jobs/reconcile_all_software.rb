class ReconcileAllSoftware < ApplicationJob
  queue_as :default

  def perform
    Software.in_batches do |batch_of_software|
      sleep(10)
      batch_of_software.each(&:reconcile!)
    end
  end
end
