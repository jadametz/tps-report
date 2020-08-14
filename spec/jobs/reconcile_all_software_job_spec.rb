require 'rails_helper'

RSpec.describe ReconcileAllSoftwareJob, type: :job do

  let(:software) { instance_double(Software) }
  subject(:job) { ReconcileAllSoftwareJob.new }

  describe '#perform' do
    it "reconciles all software in batches" do
      ActiveJob::Base.queue_adapter = :test
      # TODO: Fix this, expects a block
      #expect(Software).to receive(:in_batches).with(of: 25).and_yield([software])
      #expect(software).to receive(:reconcile!)
      #job.perform
    end
  end
end
