class ApplicationController < ActionController::API
  include ActionController::Cookies

rescue_from ActiveRecord::RecordInvalid, with: :unproccesable_entity_resp
rescue_from ActiveRecord::RecordNotFound, with: :not_found_resp

before_action :authorize

private 

def unproccesable_entity_resp(exception)
render json: {errors: exception.record.errors.full_messages}, status: :unproccesable_entity
end

def not_found_resp  
  render json: {errors: "Not Found"}, status: :not_found
end

def authorize
  @current_owner = Owner.find_by(id: session[:owner_id])
  render json: {errors:["Not Authorized"]}, status: :unauthorized unless @current_owner
end

end
+
3.