Given(/^the following templates exist:$/) do |table|
  table.hashes.each do |a|
    @template = Template.create(a)
  end
end
