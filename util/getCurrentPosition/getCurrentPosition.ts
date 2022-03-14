const GetUserLocation = (
  enableHighAccuracy = true,
  timeout = 5000,
  maximumAge = 0
): Promise<GeolocationCoordinates> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve(position.coords)
      },
      err => {
        reject(err)
      },
      {
        enableHighAccuracy,
        timeout,
        maximumAge
      }
    )
  })
}

export default GetUserLocation
