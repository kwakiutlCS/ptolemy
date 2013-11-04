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

  before_validation :populate_fields

  has_many :activities
  has_many :data_points, dependent: :destroy
  has_many :answers, dependent: :destroy

  

  def email_required?
    false
  end

  def email_changed?
    false
  end

  def populate_fields
    @@counter ||= 1
    self.role ||= "teacher"
    self.email ||= "no_email_#{@@counter}@example.com"
    self.login ||= "no_login_#{@@counter}"
    @@counter += 1
  end

end
