Rails.application.routes.draw do
  resources :task_assignments
  resources :task_labels
  resources :labels
  resources :subtasks
  resources :tasks
  resources :categories
  resources :boards
  resources :team_assignments
  resources :teams
  resources :members
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

    # route to test your configuration
    # get '/hello', to: 'application#hello_world'
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
    post "/signup", to: "members#create"
    get "/me", to: "members#show"
    
    # get "/my-teams", to: "members#teams"


end
