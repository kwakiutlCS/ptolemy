FactoryGirl.define do
  factory :template do
    sequence(:url) {|n| "/example#{n}"}
    sequence(:description) {|n| "my bogus template description#{n}"}
    sequence(:title) {|n| "template#{n}"}
  end
end
