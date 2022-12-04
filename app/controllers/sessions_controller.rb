class SessionsController < ApplicationController

    skip_before_action :authorize, only: [:create]

    def create 
        puts params[:username]
        owner = Owner.find_by_username(params[:username])
      
        if owner&.authenticate(params[:password])
            session[:owner_id] = owner.id  
            render json: owner,  status: :ok
        else
            render json: {errors:["Invalid username or password"]}, status: :unauthorized
        end
    end

    

    def destroy
        session.delete(:owner_id)
        head :no_content
    end
end
