FactoryGirl.define do
  factory :answer do
    questions ["ola", "sfd", "lsfdj"]
    answers ["sf","","sdf"]
    activity_id 1
    user_id 1
    submited false
    parameters [0,0,0]
  end
end
