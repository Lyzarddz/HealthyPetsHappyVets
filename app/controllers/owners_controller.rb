class OwnersController < ApplicationController

    skip_before_action :authorize, only: :create

    def create
        owner= Owner.create!(owner_params)
        session[:owner_id] = owner.id
        render json: owner, status: :created
    end 

    def show
        render json: @current_owner, status: :ok
    end
 
    private

    def owner_params
        params.require(:owner).permit( :username, :password)
    end
end