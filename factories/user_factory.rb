FactoryGirl.define do
  factory :user do
    sequence(:login) {|n| "palerma#{n}"}
    password "password"
    role "teacher"
  end
end
