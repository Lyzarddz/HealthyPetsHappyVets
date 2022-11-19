class ApplicationController < ActionController::API
  include ActionController::Cookies

rescue_from ActiveRecord::RecordInvalid, with: :unproccesable_entity_resp

before_action :authorize

private 

def unproccesable_entity_resp(exception)
render json: {errors: exception.record.errors.full_messages}, status: :unproccesable_entity
end

def authorize
  @current_owner = Owner.find_by(id: session[:owner_id])
  render json: {errors:["Not Authorized"]}, status: :unauthorized unless @current_owner
end

end
