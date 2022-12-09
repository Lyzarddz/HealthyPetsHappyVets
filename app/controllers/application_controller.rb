class ApplicationController < ActionController::API

  before_action :authorize

  include ActionController::Cookies

# rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_resp
rescue_from ActiveRecord::RecordNotFound, with: :not_found_resp


def current_owner
  @current_owner ||= Owner.find_by_id(session[:owner_id])    #memoization 
end 


private 

# def unprocessable_entity_resp(invalid)
# render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
# end

def not_found_resp  
  render json: {errors: "Not Found"}, status: :not_found
end

def authorize
  render json: {errors:{Owner: "Not Authorized"}}, status: :unauthorized unless current_owner
end

end
