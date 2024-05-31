class ApiController < ApplicationController
  def api_key
    render json: {apikey: ENV['API_KEY']}
  end
end
