require 'rails_helper'

RSpec.describe Software, type: :model do

  it 'cannot save without attributes' do
    software = Software.new
    software.save
  end

  context "uniqueness" do
    before do
      allow_any_instance_of(Software).to receive(:reconcile_immediately).and_return(true)
    end

    it "cannot have duplication with an org" do
      Software.create(name: 'cannot', org: 'duplicate', full_name: 'duplicate/cannot')
      duplicate = Software.new(name: 'cannot', org: 'duplicate', full_name: 'duplicate/cannot')
      expect(duplicate).to_not be_valid
    end

    it "can have duplication across org(s)" do
      Software.create(name: 'can', org: 'duplicate', full_name: 'duplicate/can')
      duplicate = Software.new(name: 'can', org: 'different', full_name: 'different/can')
      expect(duplicate).to be_valid
    end
  end

  context '#after_create_commit' do
    it 'queues for reconcile after being saved' do
      ActiveJob::Base.queue_adapter = :test
      expect {
        Software.create(full_name: 'jadametz/tps-report', org: 'jadametz', name: 'tps-report')
      }.to have_enqueued_job(ReconcileSoftware)
    end
  end
end
