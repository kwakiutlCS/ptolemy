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
  validate :student_name
  
  has_many :activities
  has_many :data_points, through: :answers
  has_many :answers, dependent: :destroy
  serialize :completed

  before_validation :populate_fields

  def email_required?
    false
  end

  def email_changed?
    false
  end

  def populate_fields
    x = rand(36**7...36**8).to_s(36)
    z = rand(36**7...36**8).to_s(36)
    if self.role == "1" || self.role == "student" then self.role = "student" else self.role = "teacher" end
    
    self.email = "#{z}noEmail#{x}@example.com" if !self.email || self.email == ""
    self.login = "#{z}noLogin#{x}" if self.account_type == 2
    self.completed ||= []
  end


  def student_name
    if self.role == "student"
      if !self.name || self.name == ""
        errors.add(:name, "no_name_error")
      end
    end
  end


  def get_activity_with_template(id)
    self.activities.includes(:template).where(id: id).first
  end

end
