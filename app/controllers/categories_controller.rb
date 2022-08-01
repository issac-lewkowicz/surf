class CategoriesController < ApplicationController
  before_action :find_model, only: [:show, :update, :destroy]

  def index
    render json: Model.all
  end

  def create
    model = Model.create!(model_params)
    render json: model, status: :created
  end

  def show
    render json: @model
  end

  def update
    @model.update!(model_params)
    render json: model, status: :accepted
  end

  def destroy
    @model.destroy
    head :no_content
  end


  private

  def find_model
    @model = Model.find(params[:id])
  end

  def model_params
    params.permit(:attribute1, :attribute2)
  end




end
