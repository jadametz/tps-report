require 'rails_helper'

RSpec.describe ReconcileSoftwareJob, type: :job do

  let(:software) { instance_double(Software) }
  subject(:job) { ReconcileSoftwareJob.new }

  describe '#perform' do
    it "reconciles software" do
      ActiveJob::Base.queue_adapter = :test
      expect(software).to receive(:reconcile!)
      job.perform(software)
    end
  end
end
