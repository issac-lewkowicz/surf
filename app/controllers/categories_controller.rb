class CategoriesController < ApplicationController
  before_action :find_category, only: [:show, :update, :destroy]
  before_action :find_board, only: [:index]

  def index
    render json: @board.categories
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
    render json: @category, status: :accepted
  end

  def destroy
    @category.destroy
    head :no_content
  end


  private

  def find_category
    @category = Category.find(params[:id])
  end

  def find_board
    @board = Board.find(params[:board_id])
  end

  def category_params
    params.permit(:title, :board_id, :id)
  end




end
