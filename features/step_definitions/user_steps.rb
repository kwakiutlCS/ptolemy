Given(/^I am on the signup page$/) do
  visit new_user_registration_path
end


Given(/^the following users exist:$/) do |table|
  table.hashes.each do |a|
    User.create(a)
  end
end

Given(/^I am on the signin page$/) do
  visit new_user_session_path
end


Given(/^I am signed in as "(.*?)"$/) do |arg1|
  steps %Q{
      Given I am on the signin page
      When I fill in "Name" with "#{arg1}"
      And I fill in "Password" with "password"
      And I press "Sign in"
  }
end

Given(/^I am on the templates page$/) do 
  visit templates_path
end

Given(/^"(.*?)" has the following activities:$/) do |arg1, table|
  user = User.where(name: arg1).first
  table.hashes.each do |a|
    t = user.activities.build(a)
    t.save
  end
end
