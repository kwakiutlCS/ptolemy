Given(/^the following templates exist:$/) do |table|
  table.hashes.each do |a|
    @template = FactoryGirl.create(:template, a)
  end
end
