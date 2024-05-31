from sklearn.cluster import DBSCAN
import pandas as pd
import matplotlib.pyplot as plt

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
    # For visualisation, feel free to examine this scatter plot:
    # plt.scatter(df["latitude"], df["longitude"], c=df["cluster"])
    # for i, txt in enumerate(df["address"]):
    #     plt.annotate(txt, (df["latitude"][i], df["longitude"][i]))
    # plt.show()

    # calculate centroids
    centroids = df[["latitude", "longitude", "cluster"]].groupby("cluster").mean()
    # drop centroid for cluster -1 (these are outliers), if it exists
    centroids = centroids.drop(index=-1, errors='ignore')
    centroids = centroids.reset_index()
    if include_outliers:
        # assume all outliers as hotspots, create a hotspot table
        hotspots = pd.concat([df[df["cluster"] == -1], centroids])[["latitude", "longitude"]].reset_index(drop=True)
    else:
        hotspots = centroids.reset_index(drop=True)
    return hotspots
    
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

df = pd.DataFrame(test)
df.columns = ["address", "latitude", "longitude"]
print(calculate_hotspots(df))