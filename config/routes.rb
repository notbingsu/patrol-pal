Rails.application.routes.draw do
  resources :locations
  resources :reports
  devise_for :users do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end
  root 'home#index'
  get 'home/index'
  get 'patrol', to: 'patrol#panel'
  get 'optimise', to: 'patrol#optimise'
  get 'reports', to: 'reports#index'
  get 'api_key', to: 'api_controller#api_key'
  get 'generate_route', to: 'reports#generate_route'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
