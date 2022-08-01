Rails.application.routes.draw do
  # resources :task_assignments
  # resources :task_labels
  # resources :team_assignments
  resources :members

  resources :teams do 
    resources :boards, shallow: true
  end
  resources :boards, except: :create do 
    resources :categories, shallow: true  
  end
  resources :categories, except: :create do
    resources :tasks, shallow: true
  end
  resources :tasks, except: :create do
    resources :subtasks, shallow: true
    resources :labels, shallow: true
  end
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
