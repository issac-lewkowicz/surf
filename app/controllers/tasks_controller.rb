class TasksController < ApplicationController
  before_action :find_task, only: [:show, :update, :destroy]

  def index
    render json: Task.all
  end

  def create
    task = Task.create!(task_params)
    render json: task, status: :created
  end

  def show
    render json: @task
  end

  def update
    @task.update!(task_params)
    render json: task, status: :accepted
  end

  def destroy
    @task.destroy
    head :no_content
  end


  private

  def find_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.permit(:category_id, :title, :description, :due_date)
  end




end
