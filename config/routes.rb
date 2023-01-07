Rails.application.routes.draw do
  scope '/api/v1' do
      resources :groups do
        resources :todos
      end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
