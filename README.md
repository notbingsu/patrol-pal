# PatrolPal

A Ruby on Rails application that analyses crime data and generates optimised patrol routes for police officers.

## Features

Implemented Features:
- User authentication
- CRUD for crime reports
- Frontend Maps interface

Even though we elaborated on these processes and concepts in the video, these features are **NOT** available for use via the Ruby on Rails application. Feel free to look at `/scripts` for the Cloud Functions code that implements these:
- Calculating hotspots based on crime data
- Generating patrol routes based on hotspots

Future Features:
- Implementing the above features in the Ruby on Rails application
- Segregate crime data by type of crime
- Cluster crime based on more data points, such as time

## Installation

Ruby version: 3.3.1

This is a Ruby on Rails application. To run it, you will need to have Ruby and Rails installed on your machine.

1. Clone the repository
2. Run `bundle install` to install the required gems
3. Run `rails db:migrate` to create the database
4. Run `rails server` to start the server
5. Visit `http://localhost:3000` in your browser
