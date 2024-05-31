import functions_framework
from google.maps import routeoptimization_v1 as ro
import json

@functions_framework.http
def optimise_route_request(request):
    """HTTP Cloud Function.
    Args:
        request (flask.Request): The request object.
        <https://flask.palletsprojects.com/en/1.1.x/api/#incoming-request-data>
    Returns:
        The response text, or any set of values that can be turned into a
        Response object using `make_response`
        <https://flask.palletsprojects.com/en/1.1.x/api/#flask.make_response>.
    """
    request_json = request.get_json(silent=True)
    if request_json is None:
        # throw some error
        return None
    for x in ['police_station', 'hotspots', 'start_time', 'end_time']:
        if x not in request_json:
            # throw some error
            return None
    police_station = request_json['police_station']
    hotspots = request_json['hotspots']
    start_time = request_json['start_time']
    end_time = request_json['end_time']

    output = optimize_route(police_station, hotspots, start_time, end_time)
    return json.dumps(output)



"""
Based on selected hotspots, finds the best route to travel all hotspots in the minimum amount of time.
Travelling time is retrieved from Google Maps API.
"""

def optimize_route(police_station, hotspots, start_time, end_time):
    """
    Draws a route that is optimized "well enough" that includes a police station and all hotspots.
    Writes the output to out/output.json

    Parameters
    ---
    police_station : LatLng
        represents the location of the police station which the patrol will begin and end at
    hotspots : list[LatLng]
        represents a list of locations of hotspots which are to be patrolled, in any order
    A LatLng object should look like this:
    {
        "latitude" : float
        "longitude" : float
    }
    
    Returns
    ---
    An object containing the following values:
    visits : list[{
        latitude : float
        longitude : float
        detour_seconds : int
        start_time_seconds : int
    }]
        Represents a list of visits to each hotspot.
        For instance, visits[i] corresponds to the i-th hotspot visited.
        This list excludes the start and end point.
        Attributes are derived from the Visit object [https://developers.google.com/maps/documentation/route-optimization/reference/rest/v1/ShipmentRoute#visit]
    transitions : list[{
        travel_duration_seconds : int
        travel_distance_meters : float
    }]
        Represents the transitions between each location on the route.
        For instance, visits and transitions can be visualised this way:
            (start) -> transitions[0] -> visits[0] -> transitions[1] -> ... -> transitions[n] -> visits[n] -> transitions[n+1] -> (end)
        Attributes are derived from the Transition object [https://developers.google.com/maps/documentation/route-optimization/reference/rest/v1/ShipmentRoute#transition]
    encoded_polyline : str
        Contains the string representing encoded points for the polyline of the route.
        [https://developers.google.com/maps/documentation/route-optimization/reference/rest/v1/ShipmentRoute#encodedpolyline]

    Raises
    ---
    TypeError
        if any of the supplied parameters are of incorrect type

    """

    # check parameters
    if "latitude" not in police_station or "longitude" not in police_station:
        raise TypeError("police_station should contain latitude and longitude")
    for hotspot in hotspots:
        if "latitude" not in hotspot or "longitude" not in hotspot:
            raise TypeError("hotspot should contain latitude and longitude")
    
    # initialise client
    client = ro.RouteOptimizationClient()

    # create shipments list
    shipments = [{
        "pickups": [{
            "arrival_location": hotspot
        }]
    } for hotspot in hotspots]

    # construct request
    request = ro.OptimizeToursRequest(
        parent="projects/second-height-424909-f0",
        model={
        "shipments": shipments,
        "vehicles": [
            {
            "start_location": police_station,
            "end_location": police_station,
            "cost_per_kilometer": 1.0
            }
        ],
        "global_start_time": start_time,
        "global_end_time": end_time
        },
        populate_polylines=True
    )

    # obtain a response
    response = client.optimize_tours(request=request)

    # obtain route data
    route = response.routes[0]
    visits = route.visits
    transitions = route.transitions
    # according to google documentation, route looks like this:
    # (start) -> transitions[0] -> visits[0] -> transitions[1] -> ... -> transitions[n] -> visits[n] -> transitions[n+1] -> (end)
    encoded_polyline = route.route_polyline.points

    output_visits = []
    for visit in visits:
        latitude = hotspots[visit.shipment_index]["latitude"]
        longitude = hotspots[visit.shipment_index]["longitude"]
        detour_seconds = visit.detour.seconds
        start_time_seconds = visit.start_time.timestamp()
        output_visits.append({
            "latitude": latitude,
            "longitude": longitude,
            "detour_seconds": detour_seconds,
            "start_time_seconds": start_time_seconds
        })

    output_transitions = []
    for transition in transitions:
        travel_duration_seconds = transition.travel_duration.seconds
        travel_distance_meters = transition.travel_distance_meters
        output_transitions.append({
            "travel_duration": travel_duration_seconds,
            "travel_distance": travel_distance_meters
        })

    output = {
        "visits": output_visits,
        "transitions": output_transitions,
        "encoded_polyline": encoded_polyline
    }

    return output


"""
Test Request with Sample Data
"""

test_request = {
    "police_station": {
        "latitude": 1.4294854895835194, 
        "longitude": 103.84014800478174
    },
    "hotspots": [
        {
            "latitude": 1.4210816436674003, 
            "longitude": 103.84761568650755
        },
        {
            "latitude": 1.4251709344391268,
            "longitude": 103.84476571069965
        },
        {
            "latitude": 1.424407006907169, 
            "longitude": 103.84098276837128
        },
        {
            "latitude": 1.425038977195743, 
            "longitude": 103.8298203106997
        },
        {
            "latitude": 1.4182852241270225, 
            "longitude": 103.8410208665204
        },
        {
            "latitude": 1.4143117474473463, 
            "longitude": 103.8307012376845
        },
        {
            "latitude": 1.4239741964823807, 
            "longitude": 103.83678755911649
        },
        {
            "latitude": 1.4268853888536341, 
            "longitude": 103.84922392217099
        },
        {
            "latitude": 1.4314624730771077, 
            "longitude": 103.84505305302795
        },
        {
            "latitude": 1.4156091006464437, 
            "longitude": 103.83967627842229
        }
    ],
    "start_time" : "2024-05-30T00:00:00.000Z",
    "end_time" : "2024-05-31T06:00:00.000Z"
}

import requests
from dotenv import load_dotenv
import os
load_dotenv()
API_KEY = os.environ.get("API_KEY")

gateway_url = "https://patrol-pal-route-optimisation-gateway-6vhrt1mo.an.gateway.dev"
url = gateway_url + "/optimise-route" + "?key=" + API_KEY
session = requests.Session()
session.headers.update({
    'Content-Type':'application/json',
    })
response = session.post(url, json=test_request)
if response.ok:
    print(response.status_code)
    print(response.json())
else:
    print(response.status_code)
    print(response.content)




