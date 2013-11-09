# -*- coding: utf-8 -*-

class Answer < ActiveRecord::Base
  attr_accessible  :answers, :questions,  :time_submission, :submited

  validates :activity_id, presence: true
  validates :user_id, presence: true
  validates :answers, presence: true
  validates :questions, presence: true
  validate :answers_length

  serialize :answers
  serialize :questions

  belongs_to :user
  has_many :data_points, dependent: :destroy
  
  def answers_length
    if answers && questions 
      if answers.length != questions.length
        errors.add(:answers, "o número de respostas não é igual ao número de perguntas")
      end
    end
  end

  scope :old, -> { where("created_at < ? and submited = ?", Time.now-5400, false)}
  scope :submited, -> { where("submited = ?", true) }

end
