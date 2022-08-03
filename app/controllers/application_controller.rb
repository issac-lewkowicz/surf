class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :authenticate_user
  wrap_parameters false
  rescue_from ActiveRecord::RecordNotFound, with: :not_found_resp
  rescue_from ActiveRecord::RecordInvalid, with: :not_valid_resp

  # GET '/hello'
  def hello_world
    session[:count] = (session[:count] || 0) + 1
    render json: { count: session[:count] }
  end

  private

  def current_user
    @current_user ||= Member.find_by_id(session[:member_id])
  end

  def authenticate_user
    return if current_user
    render json: { errors: "You must be logged in to do that." }, status: :unauthorized
  end

  def not_found_resp(exception)
    render json: { error: "#{exception.model} not found"}, status: :not_found
  end

  def not_valid_resp(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end
end