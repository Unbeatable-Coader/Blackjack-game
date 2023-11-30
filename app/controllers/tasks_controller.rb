class TasksController < ApplicationController
  before_action :current_user, only: [:new]
  before_action :set_task, only: [:new, :show, :edit, :update, :destroy]
  load_and_authorize_resource

  def index
    @tasks = Task.all
  end

  def show
    @task = Task.find(params[:id])
  end

  def new
    @task = current_user.tasks.build
  end

  def create
    
    @task = current_user.tasks.build(task_params)

    if @task.save
      redirect_to @task, notice: 'Task was successfully created.'
    else
      render :new
    end
  end

  def edit
    @task = Task.find(params[:id])
  end

  def update
    @task = Task.find(params[:id])

    if @task.update(task_params)
      redirect_to @task, notice: 'Task was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy

    redirect_to tasks_url, notice: 'Task was successfully destroyed.'
  end



  private

  def current_user
    token = session[:usertype]
    if token.present?
      user_info = JsonWebToken.decode(token)
      user_id = user_info[:email]
      puts " user id = #{user_id}"
      if user_id.present?
        @current_user = User.find_by(email: user_id)
      else
        @current_user = nil
      end
    else
      @current_user = nil
    end
    @current_user
  end


end
