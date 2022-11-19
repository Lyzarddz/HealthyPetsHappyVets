Rails.application.routes.draw do
  
  resources :records
  resources :vets
  resources :pets
  resources :owners
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
