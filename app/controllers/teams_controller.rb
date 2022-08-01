class TeamsController < ApplicationController
  before_action :find_team, only: [:show, :update, :destroy]

  def index
    render json: @current_user.teams
  end

  def create
    team = @current_user.teams.create!(team_params)
    render json: team, status: :created
  end

  def show
    render json: @team
  end

  def update
    @team.update!(team_params)
    render json: team, status: :accepted
  end

  def destroy
    @team.destroy
    head :no_content
  end

  # def new_board
  #   board = @team.boards.create!(board_params)
  #   render json: board, status: :created
  # end


  private

  def find_team
    @team = Team.find(params[:id])
  end

  def team_params
    params.permit(:team_name, :member_id)
  end




end
