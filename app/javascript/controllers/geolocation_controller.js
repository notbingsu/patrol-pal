let following = false;
let id;
function geoFollowMe() {
  const status =
    document.querySelector("#status");
  const on_shift =
    document.querySelector("#follow-me");
  let options;

  options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0,
  };

  if (!following) {
    id = navigator.geolocation.watchPosition(
      success,
      error,
      options
    );
    following = true;
    status.style.display = "block";
    on_shift.textContent = "On Shift";
    on_shift.classList.remove("btn-primary");
    on_shift.classList.add("btn-danger");
  } else {
    navigator.geolocation.clearWatch(id);
    following = false;
    status.style.display = "none";
    on_shift.textContent = "Shift Ended";
    on_shift.disabled = true;
  }
  function success(pos) {
    const crd = pos.coords;
    status.textContent = `${crd.latitude} | ${crd.longitude}`;
  }

  function error(err) {
    console.log(
      `ERROR(${err.code}): ${err.message}`
    );
  }
}

// document
//   .querySelector("#find-me")
//   .addEventListener("click", geoFindMe);

document
  .querySelector("#follow-me")
  .addEventListener("click", geoFollowMe);
