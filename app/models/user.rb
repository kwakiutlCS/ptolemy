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
    counter = User.count
    if self.role == "1" then self.role = "student" else self.role = "teacher" end
    
    self.email = "noEmail#{counter}@example.com" if !self.email || self.email == ""
    self.login = "noLogin#{counter}" if self.account_type == 2
   
  end

end
