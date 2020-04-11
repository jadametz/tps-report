Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'software/index'
      post 'software/create'
      get 'software/show/:id', action: 'show', controller: 'software'
      delete 'software/destroy/:id', action: 'destroy', controller: 'software'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
