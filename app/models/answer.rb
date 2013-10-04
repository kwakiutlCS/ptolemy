# -*- coding: utf-8 -*-

class Answer < ActiveRecord::Base
  attr_accessible :activity_id, :answers, :questions, :student_id

  validates :activity_id, presence: true
  validates :student_id, presence: true
  validates :answers, presence: true
  validates :questions, presence: true
  validate :answers_length

  serialize :answers
  serialize :questions

  belongs_to :student
  
  def answers_length
    if answers && questions 
      if answers.length != questions.length
        errors.add(:answers, "o número de respostas não é igual ao número de perguntas")
      end
    end
  end
end
