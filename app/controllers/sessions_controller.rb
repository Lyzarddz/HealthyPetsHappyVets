class SessionsController < ApplicationController

    skip_before_action :authorize, only: :create

    def create 
        owner= Owner.find_by(username: params[:username])
        if owner&.authenticate(params[:password])
            session[:owner_id] = owner.index
            render json: owner,  status: :created
        else
            render json: {errors:["Invalid username or password"]}, status: :unauthorized
        end
    end

    def destroy
        session.delete(:owner_id)
        head :no_content
    end
end
