class Location < ApplicationRecord
  reverse_geocoded_by :ltd, :lng
  after_validation :reverse_geocode
end
