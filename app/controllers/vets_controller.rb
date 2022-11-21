class VetsController < ApplicationController

    def index 

    end

    def show 
    end

    def create 
        vet = Vet.create!(vet_params)
        render json: vet, status: :created
    end

    private
    
    def vet_params
        params.permit(name)
    end
end
