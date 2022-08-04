class TeamAssignmentsController < ApplicationController

  def create
    team_assignment = TeamAssignment.create!(team_assignment_params)
    render json: team_assignment, status: :created
  end


  private

  def team_assignment_params
    params.permit(:team_id ,:member_id, :id)
  end
end
