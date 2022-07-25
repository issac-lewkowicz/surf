class SessionsController < ApplicationController
  skip_before_action :authenticate_user 

  # POST '/login'
  def create
    member = Member.find_by(username: params[:username])
    if member&.authenticate(params[:password])
      session[:member_id] = member.id
      render json: member, status: :ok
    else
      render json: { errors: 'Invalid credentials' }, status: :unauthorized
    end
  end

  # DELETE '/logout'
  def destroy
    if current_user
      session.clear
    else
      render json: { errors: "No active session" }, status: :unauthorized
    end
  end


end