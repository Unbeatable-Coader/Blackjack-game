class AddAttributesToTasks < ActiveRecord::Migration[7.1]
  def change
    add_column :tasks, :title, :string
    add_column :tasks, :status, :string
    add_reference :tasks, :user, null: false, foreign_key: true
    add_reference :tasks, :manager, null: false, foreign_key: true
  end
end
