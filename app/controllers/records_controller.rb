class RecordsController < ApplicationController

    
    skip_before_action :authorize, only: [:create]


    def index 
        render json: Record.all, status: :ok
    end

    def show
        record = Record.find(params[:id])
        render json: record
    end

    def create
        record = Record.create!(record_params)
        render json: record, status: :created
    end

    def update
        record = Record.find(params[:id])
        record.update(record_params)
        render json: record, status: :updated
    end
    
    def destroy
        record = Record.find(params[:id])
        record.destroy
        head :no_content
    end

    private

    def record_params
        params.permit(:vaccine, :prevention, :altered, :pets_id)
    end
end