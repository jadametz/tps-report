require 'rails_helper'

RSpec.describe Software, type: :model do

  describe '#name' do
    subject { Software.new(name: "something", org: "else", full_name: "else/somthing") }
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_uniqueness_of(:name).scoped_to(:org) }
  end

  describe '#org' do
    it { is_expected.to validate_presence_of(:org) }
  end

  describe '#full_name' do
    subject { Software.new(name: "something", org: "else", full_name: "else/somthing") }
    it { is_expected.to validate_presence_of(:full_name) }
    it { is_expected.to validate_uniqueness_of(:full_name) }
  end

  it 'strips whitespace on attributes' do
    new = Software.new(name: ' therebe ', org: ' whitespace ', full_name: ' therebe/whitespace ')
    # TODO: This abuses the validation to modify the object, we should just override the attribute_writer
    new.valid?
    expect(new.name). to eql('therebe')
    expect(new.org). to eql('whitespace')
    expect(new.full_name). to eql('therebe/whitespace')
  end

  context '#after_create_commit' do
    it 'queues to be reconciled after commit' do
      ActiveJob::Base.queue_adapter = :test
      expect {
        Software.create(full_name: 'jadametz/tps-report', org: 'jadametz', name: 'tps-report')
      }.to have_enqueued_job(ReconcileSoftwareJob)
    end
  end
end
