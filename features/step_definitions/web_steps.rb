Given(/^I follow "(.*?)"$/) do |arg1|
  click_link arg1
end


Given(/^I fill in "(.*?)" with "(.*?)"$/) do |arg1, arg2|
  fill_in arg1, with: arg2
end

Given(/^I press "(.*?)"$/) do |arg1|
  click_button arg1
end

Then(/^I should see "(.*?)"$/) do |arg1|
  page.should have_content(arg1)
end


Then(/^I should not see "(.*?)"$/) do |arg1|
  page.should_not have_content(arg1)
end

Given(/^I am on the homepage$/) do
  visit root_path
end

When(/^I choose "(.*?)"$/) do |arg1|
  choose(arg1)
end

Then(/^I should be on the homepage$/) do
  current_url.should == root_url
end

When(/^within "(.*?)" I press "(.*?)"$/) do |arg1, arg2|
  within(:css, arg1) { click_button arg2 }
end

When(/^I select "(.*?)" from "(.*?)"$/) do |arg1, arg2|
  select(arg1, from: arg2)
end

