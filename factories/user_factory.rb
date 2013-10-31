FactoryGirl.define do
  factory :user do
    sequence(:name) {|n| "palerma#{n}"}
    password "password"
    role "teacher"
  end
end
