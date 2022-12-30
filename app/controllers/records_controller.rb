class RecordsController < ApplicationController

    
    skip_before_action :authorize, only: [:create]

    def index 
        render json: current_owner.records.all, status: :ok
    end

    def show
        record = current_owner.records.find(params[:id])
        render json: record
    end

    def create
        pet = current_owner.pets.find(params[:pet_id])
        record = pet.records.create!(record_params)
        render json: record, status: :created
    end

    def update
        record = current_owner.records.find(params[:id])
        record.update(record_params)
        render json: record, status: :created
    end
    
    def destroy
        record = current_owner.records.find(params[:id])
        record.destroy
        head :no_content
    end

    private

    def record_params
        params.permit(:vaccine, :prevention, :altered, :notes, :date)
    end
end