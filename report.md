# Project Report

## Inspiration

Nowadays, with increasing digitalisation and more comprehensive data collection techniques, it is possible to collect large amounts of crime data. With so much complicated crime data, it is increasingly difficult to identify hotspots and build patrol routes by simply reading through the data. We want to build an app that will alleviate this issue and assist policemen on their patrols.

## What it does

Our hack aims to demonstrate a “companion app” which helps policemen analyse crime data and construct a reasonable patrol route. Firstly, the app clusters crime location data by density - in other words, crimes will be grouped together if they are close to each other. This should be able to identify areas where crimes occur frequently. Each of these areas are then plotted onto a route. The route is optimised for efficient traversal so that policemen will be able to patrol more areas within their shift. After calculating the route, the app will also show policemen their location and progress of their patrol. Hence, this app integrates crime hotspot analysis and from the analysis, derives an appropriate route for the policemen.

## How we built it

Firstly, we spent a few hours researching the various areas and brainstorming solutions to the various problem statements. We eventually decided to pick this problem statement because it seemed interesting and we had some ideas on algorithms to tackle the issue. We then divided ourselves into two roles based on our current knowledge - Jason would handle the backend implementations of analysis algorithms and backend infrastructure whereas Bings would handle the frontend implementation and communication with the backend.

In building the frontend, we decided to use Ruby because it is very powerful and is able to prototype interfaces quickly. In building the backend, we decided to use a python backend hosted on Google Cloud Functions, since python is generally preferred for data analytics and the Cloud Functions would be able to run the python scripts quickly and conveniently.

In determining the algorithms to handle the problem of crime hotspot analysis and route optimisation, we created our solution assuming that we have a large dataset of police reports. Each police report should have a location where the crime occurred. We decided on using the DBSCAN algorithm to identify hotspots, since it is able to identify densely packed areas. After clustering the reports and identifying hotspots, these hotspots would then be passed on to Google’s API for route optimisation, which is likely to be fast and reliable, to create a route.

This information is then visualised on the ruby application using the Google Maps interface, allowing policemen to easily follow an optimised route.

## Challenges we ran into

Determining a good algorithm for clustering reports and optimising routes, due to the plethora of methods.
Making sure the Google API for Route Optimisation runs smoothly, since there was quite a lot of set up required
Displaying the route on the map properly, due to the complexity of the Google Maps API
Accomplishments that we're proud of
Implemented a robust Google backend
Crafted a stylized frontend interface with Ruby on Rails

## What we learned

Time management is really important. It's easy to get sidetracked on problems that are difficult to solve and waste a lot of time. We had to make sure that we are spending our time on the most important features. 48 hours is not a lot of time at all.
What's next for PatrolPal
Allow policemen to analyse only a certain type of data, for instance only crimes involving traffic accidents
Further cluster data according to time, so that shifts can strategically target crimes that are likely to occur at certain times.

### Distribution of Work

Jason: Cloud Functions, Route Optimisation Algorithm, Hotspot generation algorithm
Bingyuan: Frontend, Google Maps API, User Interface, Backend
