class CreateManagers < ActiveRecord::Migration[7.1]
  def change
    create_table :managers do |t|
      t.string :name
      t.string :email
      t.string :usertype
      t.string :password_digest

      t.timestamps
    end
  end
end
