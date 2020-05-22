Octokit.configure do |c|
  c.auto_paginate = true
end

Rails.application.config.github_client = Octokit::Client.new
