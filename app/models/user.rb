class User < ApplicationRecord
  has_secure_password

  has_many :tasks
  has_many :managed_tasks, class_name: 'Task', foreign_key: 'manager_id'
  after_create :assign_default_role

  private

  def assign_default_role
    add_role(:employee)
  end
end
