# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20140106151816) do

  create_table "activities", :force => true do |t|
    t.string   "code"
    t.datetime "deadline"
    t.integer  "template_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.integer  "user_id"
    t.string   "description"
    t.integer  "filter_id"
    t.boolean  "inactive"
  end

  create_table "answers", :force => true do |t|
    t.text     "questions"
    t.text     "answers"
    t.integer  "activity_id"
    t.integer  "user_id"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
    t.datetime "time_submission"
    t.boolean  "submited"
    t.text     "parameters"
  end

  create_table "categories", :force => true do |t|
    t.string   "title"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "data_points", :force => true do |t|
    t.float    "x"
    t.float    "y"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.string   "series"
    t.integer  "answer_id"
    t.integer  "activity_id"
  end

  create_table "open_questions", :force => true do |t|
    t.integer  "questionaire_id"
    t.string   "question"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  create_table "questionaires", :force => true do |t|
    t.integer  "user_id"
    t.string   "code"
    t.datetime "deadline"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "sub_categories", :force => true do |t|
    t.string   "title"
    t.integer  "category_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "templates", :force => true do |t|
    t.string   "url"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
    t.string   "title"
    t.string   "description"
    t.integer  "sub_category_id"
    t.string   "img"
    t.integer  "filter_id"
  end

  create_table "users", :force => true do |t|
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
    t.string   "login"
    t.string   "role"
    t.string   "name"
    t.integer  "account_type"
    t.text     "completed"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
