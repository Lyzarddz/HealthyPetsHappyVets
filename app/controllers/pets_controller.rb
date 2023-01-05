class PetsController < ApplicationController

    def index 
        render json: current_owner.pets, status: :ok
    end

    def show 
        pet = current_owner.pets.find(params[:id])
        render json: pet
    end

    def create
        pet = current_owner.pets.create!(pet_params)
        render json: pet, status: :created
        
    end
 

    def destroy
        pet = current_owner.pets.find(params[:id])
        pet.destroy
        head :no_content
    end

    private

    def pet_params
        params.permit(:name, :species, :age, :vet_id)
    end
end
