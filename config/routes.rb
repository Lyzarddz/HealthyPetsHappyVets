Rails.application.routes.draw do
  
root 'sessions#home'
  resources :records
  resources :vets, only: [:index, :show, :create]
  resources :pets, only: [:index, :create, :show, :destroy]
  resources :owners, only: [:show, :create]
  resources :sessions

  post "/signup", to: "owners#create"
  get "/me", to: "owners#show"
  post "/login", to:"sessions#create"
  delete "/logout", to:"sessions#destroy"
  get "/vets", to:"vets#show"


  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
