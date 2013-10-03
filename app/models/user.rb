class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :name, :role
  # attr_accessible :title, :body


  validates :name, presence: true, uniqueness: {case_sensitive: false}
  validates :role, presence: true

  before_validation :populate_fields

  @@counter = 1

  def populate_fields
    self.role = "teacher"
    if self.email.length < 5
      self.email = "no-email-#{@@counter}@example.com"
      @@counter += 1
    end
  end

end
