require 'rails_helper'

describe Software do
  context '#after_create_commit' do
    it 'queues for reconcile after being saved' do
      #ActiveJob::Base.queue_adapter = :test
      #expect {
      #  Software.create(full_name: 'jadametz/tps-report', org: 'jadametz', name: 'tps-report')
      #}.to have_enqueued_job(ReconcileSoftware)
    end
  end
end
