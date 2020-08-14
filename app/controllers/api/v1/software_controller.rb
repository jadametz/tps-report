class Api::V1::SoftwareController < ApplicationController
  def index
    software = Software.all.order(created_at: :desc)
    render json: software
  end

  def create
    software = Software.create!(software_params)
    render json: software
  end

  def show
    render json: software
  end

  def destroy
    software&.destroy
    render json: { message: 'Software deleted!' }
  end

  private

  def software_params
    params.permit(:name, :org, :full_name, :in_use_release)
  end

  def software
    @software ||= Software.find(params[:id])
  end
end
