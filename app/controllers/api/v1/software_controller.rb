class Api::V1::SoftwareController < ApplicationController
  def index
    software = Software.all.order(created_at: :desc)
    render json: software
  end

  def create
    software = Software.create!(software_params)
    if software
      render json: software
    else
      render json: software.errors
    end
  end

  def show
    if software
      render json: software
    else
      render json: software.errors
    end
  end

  def destroy
    software&.destroy
    render json: { message: 'Software deleted!' }
  end

  private

  def recipe_params
    params.permit(:name, :org, :full_name)
end
