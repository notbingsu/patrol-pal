class PatrolController < ApplicationController
  def panel
    file_path = "out/output.json"
    file_content = File.read(file_path)
    @data = JSON.parse(file_content)

    Location.delete_all
    @data['visits'].each do |location|
      Location.create!(
        address: "",
        ltd: location['latitude'],
        lng: location['longitude']
      )
    end
    @locations = Location.all
    end
  end
