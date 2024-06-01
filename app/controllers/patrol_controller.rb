class PatrolController < ApplicationController
  def panel
    file_path = "out/output.json"

    begin
      file_content = File.read(file_path)
      @data = JSON.parse(file_content)
      Location.delete_all
      Polyline.delete_all
      @polyline = Polyline.new(encoding: @data['encoded_polyline'])
      @polyline.save

      @data['visits'].each do |location|
        Location.create!(
          address: "",
          ltd: location['latitude'],
          lng: location['longitude']
        )
      end
      @locations = Location.all
    rescue Errno::ENOENT
      # Handle the case when the file does not exist
      flash[:error] = "Error: File not found"
    rescue JSON::ParserError
      # Handle the case when the JSON parsing fails
      flash[:error] = "Error: Invalid JSON format"
    end
  end
end
