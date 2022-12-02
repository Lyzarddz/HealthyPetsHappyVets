class PetsController < ApplicationController
   


    def index 
        render json: Pet.all, status: :ok
    end

    def show 
        pet = Pet.find(params[:id])
        render json: pet
    end

    def create
        pet = Pet.create!(pet_params)
        render json: pet, status: :created
    end

    def destroy
        pet = Pet.find(params[:id])
        pet.destroy
        head :no_content
    end

    private

    def pet_params
        params.permit(:name, :species, :age, :vet_id, :owner_id)
    end
end
