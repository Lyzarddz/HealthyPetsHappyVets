class RecordsController < ApplicationController

    def index 
        render json: Record.all
    end

    def create
        record = Record.create!(record_params)
        render json: record, status: :created
    end

    private

    def record_params
        params.permit(:vaccine, :prevention, :altered)
    end
end