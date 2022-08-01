class BoardsController < ApplicationController
  before_action :find_board, only: [:show, :update, :destroy]

  def index
    render json: Board.all
  end

  def create
    model = @team.boards.create!(board_params)
    render json: board, status: :created
  end

  def show  
    render json: @board
  end

  def update
    @board.update!(board_params)
    render json: board, status: :accepted
  end

  def destroy
    @board.destroy
    head :no_content
  end


  private

  def find_board
    @board = Board.find(params[:id])
  end

  # def find_team
  #   @team = Team.find(params[:id])
  # end

  def board_params
    params.permit(:title, :team)
  end




end
