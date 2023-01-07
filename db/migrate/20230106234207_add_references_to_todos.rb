class AddReferencesToTodos < ActiveRecord::Migration[7.0]
  def change
    add_reference :todos, :group, null: false, foreign_key: true
  end
end
