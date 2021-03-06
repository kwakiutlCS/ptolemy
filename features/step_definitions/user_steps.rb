Given(/^I am on the signup page$/) do
  visit new_user_registration_path
end


Given(/^the following users exist:$/) do |table|
  table.hashes.each do |a|
    FactoryGirl.create(:user, a)
  end
end

Given(/^I am on the signin page$/) do
  visit new_user_session_path
end


Given(/^I am signed in as "(.*?)"$/) do |arg1|
  steps %Q{
      Given I am on the signin page
      When I fill in "Login" with "#{arg1}"
      And I fill in "Password" with "password"
      And I press "Sign in"
  }
end

Given(/^I am on the templates page$/) do 
  visit templates_path
end

Given(/^"(.*?)" has the following activities:$/) do |arg1, table|
  user = User.where(login: arg1).first
  table.hashes.each do |a|
    t = FactoryGirl.build(:activity, a)
    t.user_id = user.id
    t.save
  end
end


Given(/^"(.*?)" has the following "(.*?)" activities:$/) do |arg1, arg2, table|
  user = User.where(login: arg1).first
  template = Template.where(title: arg2).first
  table.hashes.each do |a|
    t = FactoryGirl.build(:activity, a)
    t.user_id = user.id
    t.template_id = template.id
    t.save
  end

end
