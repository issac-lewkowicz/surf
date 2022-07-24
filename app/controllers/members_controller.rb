class MembersController < ApplicationController
  skip_before_action :authenticate_user, only: [:create]

  def index
    render json: Member.all
  end

  
  # POST '/signup'
  def create
    new_member = Member.create!(member_params)
    session[:member_id] = new_member.id
    render json: new_member, status: :created
  end

  # GET '/me'
  def show
    if current_user
      render json: @current_user, status: :ok
    else
      render json: { errors: "No active session" }, status: :unauthorized
    end
  end

  def update
    @current_user.update!(user_params)
    render json: user, status: :accepted
  end

  def destroy
    @current_user.destroy
    head :no_content
  end


  private

  def member_params
    params.permit(:member_name, :username, :password, :password_confirmation, :email, :image_url)
  end
end
