class PatrolController < ApplicationController
  def panel
    Rails.logger.info("sanity check")
    Location.delete_all
    Polyline.delete_all
    file_path = "out/output.json"
    if File.exist?(file_path) && !File.zero?(file_path)
      file_content = File.read(file_path)
      @data = JSON.parse(file_content)
      @polyline = Polyline.new(encoding: @data['encoded_polyline'])
      @polyline.save
      @data['visits'].each do |place|
        lat_lng = "#{place['latitude']},#{place['longitude']}"
        api_key = 'AIzaSyARTCBV8pAR9OwEGjutqbosWJxN5xolCik'
        url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=#{lat_lng}&key=#{api_key}"
        response = HTTParty.get(url)
        name = ""
        if response.code == 200
          data = JSON.parse(response.body)
          name = data['results'][0]['formatted_address']
        else
          name = "Unknown"
        end
        Location.create!(
          "address": name,
          "ltd": place['latitude'],
          "lng": place['longitude']
        )
      end
      @locations = Location.all
    end
  end
end
