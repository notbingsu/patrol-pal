json.extract! report, :id, :title, :body, :lat, :lng, :time, :created_at, :updated_at
json.url report_url(report, format: :json)
