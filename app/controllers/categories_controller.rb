class CategoriesController < ApplicationController
  before_action :find_category, only: [:show, :update, :destroy]

  def index
    render json: Category.all
  end

  def create
    category = Category.create!(category_params)
    render json: category, status: :created
  end

  def show
    render json: @category
  end

  def update
    @category.update!(category_params)
    render json: category, status: :accepted
  end

  def destroy
    @category.destroy
    head :no_content
  end


  private

  def find_category
    @category = Category.find(params[:id])
  end

  def category_params
    params.permit(:title, :board_id)
  end




end
