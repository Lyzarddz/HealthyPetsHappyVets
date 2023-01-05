class VetsController < ApplicationController
    

    def index 
        render json: Vet.all, status: :ok
    end

    def show 
        vet = Vet.find(params[:id])
        render json: vet
    end

    def create 
        vet = Vet.create!(vet_params)
        render json: vet, status: :created
    end

    private
    
    def vet_params
        params.permit(:name)
    end
end
