class TodosController < ApplicationController
  def index
    todos = Todo.order("created_at DESC")
    render json: todos
  end

  def show
    todo = Todo.find(params[:id])
    render json: todo
  end

  def create
    logger.debug "Checking hahahahahahahahaha"
    # todo = Todo.create(title: params[:lala][:title], group_id: params[:lala][:group_id] )
    todo = Todo.create(todo_param)
    render json: todo
  end

  def update
    todo = Todo.find(params[:id])
    todo.update(todo_param)
    render json: todo
  end

  def destroy
    todo = Todo.find(params[:id])
    todo.destroy
    head :no_content, status: :ok
  end
  private
    def todo_param
      params.require(:lala).permit(:title, :group_id, :done)
    end
end
