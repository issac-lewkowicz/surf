Rails.application.routes.draw do
  # resources :task_assignments
  # resources :task_labels
  # resources :team_assignments

  resources :members do
    resources :teams, shallow: true
  end
  
  resources :teams, only: [] do
    resources :boards, shallow: true
  end
  resources :boards, only: [] do
    resources :categories, shallow: true  
  end
  resources :categories, only: [] do
    resources :tasks, shallow: true
  end
  resources :tasks, only: [] do
    resources :subtasks, shallow: true
    resources :labels, shallow: true
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

    # route to test your configuration
    # get '/hello', to: 'application#hello_world'
    get "/join-teams", to: "teams#joinable_teams"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
    post "/signup", to: "members#create"
    get "/me", to: "members#show"
    
    # get "/my-teams", to: "members#teams"


end
