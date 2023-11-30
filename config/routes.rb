Rails.application.routes.draw do

  get '/user', to: 'user#new'

  post '/user', to: 'user#create'

  get 'login', to: 'login#login'
  post 'login', to: 'login#loginPost'

  get 'newTask', to: 'tasks#create'
  get 'dashboard', to: 'login#Dashboard'


  get "up" => "rails/health#show", as: :rails_health_check


end
