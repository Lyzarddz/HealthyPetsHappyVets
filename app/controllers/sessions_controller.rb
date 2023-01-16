  class SessionsController < ApplicationController

    skip_before_action :authorize, only: :create

    def create 
        owner = Owner.find_by(username: params[:username])
        if owner&.authenticate(params[:password])
            session[:owner_id] = owner.id  
            render json: owner,  status: :ok
        else
            render json: {errors:["Invalid username or password"]}, status: :unauthorized
        end
    end

    def destroy
        session.delete :owner_id
        render json: @current_owner
    end
end
