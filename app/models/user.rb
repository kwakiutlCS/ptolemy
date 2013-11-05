class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :login, :name, :role , :account_type
  # attr_accessible :title, :body

  
  validates :login, presence: true, uniqueness: {case_sensitive: false}
  validates :role, presence: true

  
  has_many :activities
  has_many :data_points, dependent: :destroy
  has_many :answers, dependent: :destroy

  before_validation :populate_fields

  def email_required?
    false
  end

  def email_changed?
    false
  end

  def populate_fields
    x = rand(23**7..23**8).to_s(32)
    z = rand(41**7..41**8).to_s(36)
    if self.role == "1" then self.role = "student" else self.role = "teacher" end
    
    self.email = "#{z}noEmail#{x}@example.com" if !self.email || self.email == ""
    self.login = "#{z}noLogin#{x}" if self.account_type == 2
   
  end

end
