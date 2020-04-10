class Software < ApplicationRecord
  validates :name, presence: true
  validates :org, presence: true
  validates :full_name, presence: true
end
