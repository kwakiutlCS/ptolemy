FactoryGirl.define do
  factory :activity do
    sequence(:code) {|n| "code#{n}"}
    deadline {Date.today+2.weeks}
    template_id 1
    user_id 1
  end
end
