import functions_framework
from sklearn.cluster import DBSCAN
import pandas as pd

@functions_framework.http
def calculate_hotspots_request(request):
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
    if request_json is None or 'locations' not in request_json:
        # throw some error
        return 'json formatted incorrectly!'
    locations = request_json['locations']
    # locations is a list of dictionaries containing "latitude" and "longitude"
    df = pd.DataFrame(locations)[['latitude', 'longitude']]
    hotspots = calculate_hotspots(df)
    return hotspots.to_dict('records')

def calculate_hotspots(df: pd.DataFrame, eps: float = 0.005, min_samples: int = 3, include_outliers: bool = True):
    """
    Calculates hotspots based on density requirements as defined by eps and min_samples

    Parameters
    ---
    df : pd.DataFrame
        Dataframe containing columns "address", "latitude", and "longitude" for each police report
    eps: float
        Epsilon value for DBSCAN algorithm. This can be thought of as maximum separation between each point for them to be in a cluster
    min_samples: int
        Minimum number of points for a group of points to be considered to be in a cluster
    include_outliers: bool
        Whether to include outlier locations as hotspots
        This is so that outlier locations can be factored into the patrolling route as well.
    
    Returns
    ---
    hotspots: pd.DataFrame
        Dataframe containing latitude and longitude for each hotspot

    """
    # cluster dense locations together using DBSCAN
    clustering = DBSCAN(eps=eps, min_samples=min_samples).fit(df[["latitude", "longitude"]])
    df["cluster"] = clustering.labels_

    # calculate centroids
    centroids = df[["latitude", "longitude", "cluster"]].groupby("cluster").mean()
    # drop centroid for cluster -1 (these are outliers), if it exists
    centroids = centroids.drop(index=-1, errors='ignore')
    centroids = centroids.reset_index()
    if include_outliers:
        # assume all outliers as hotspots, create a hotspot table
        hotspots = pd.concat([df[df["cluster"] == -1], centroids]).reset_index(drop=True)[["latitude", "longitude"]]
    else:
        hotspots = centroids.reset_index(drop=True)[["latitude", "longitude"]]

    return hotspots


"""
Test Request with Sample Data

Request should contain list of locations that looks like this:
    Note: the items inside "locations" are allowed to have other metadata, like "address". 
    The parsing will only look at the "latitude" and "longitude" values.
---
{
    "locations" : list[{
        "latitude" : float
        "longitude" : float
    }]
}
"""

test = [
    ("433 Yishun Ave 6, Singapore 760433", 1.4209882, 103.8473447),
    ("51 Yishun Ave 11, Singapore 768867", 1.4249457, 103.8447228),
    ("60 Yishun Ave 4, Singapore 769027",  1.4242354, 103.8409184),
    ("3 Yishun Ring Rd, Singapore 768675", 1.4249639, 103.8297774),
    ("598 Yishun Ring Rd, Singapore 768698", 1.4182745, 103.8410316),
    ("2 Yishun Walk, Singapore 767944", 1.4143332, 103.8307227),
    ("2 Yishun Central 2, Singapore 768024", 1.4240983, 103.8374077),
    ("405 Yishun Ave 6, Singapore 760405", 1.4267622, 103.8492027),
    ("333 Yishun Street 31, Singapore 760333", 1.4314732, 103.8450316),
]

test_request = {
    "locations": [
        {
            "latitude": 1.4209882,
            "longitude": 103.8473447
        },
        {
            "latitude": 1.4249457,
            "longitude": 103.8447228
        },
        {
            "latitude": 1.4242354,
            "longitude": 103.8409184
        },
        {
            "latitude": 1.4249639,
            "longitude": 103.8297774
        },
        {
            "latitude": 1.4182745,
            "longitude": 103.8410316
        },
        {
            "latitude": 1.4143332,
            "longitude": 103.8307227
        },
        {
            "latitude": 1.4240983, 
            "longitude": 103.8374077
        },
        {
            "latitude": 1.4267622,
            "longitude": 103.8492027
        },
        {
            "latitude": 1.4314732,
            "longitude": 103.8450316
        }
    ]
}

import requests
from dotenv import load_dotenv
import os
load_dotenv()
API_KEY = os.environ.get("API_KEY")

gateway_url = "https://patrol-pal-route-optimisation-gateway-6vhrt1mo.an.gateway.dev"
url = gateway_url + "/calculate-hotspots" + "?key=" + API_KEY
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