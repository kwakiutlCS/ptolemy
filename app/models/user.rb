class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :login, :name, :role 
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
    self.role ||= "teacher"
    self.email = "noEmail#{counter}@example.com" unless self.email || self.email == ""
    self.login ||= "noLogin#{counter}" if self.role == "student"
   
  end

end
