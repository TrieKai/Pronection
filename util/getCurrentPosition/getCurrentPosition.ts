const GetUserLocation = (
  enableHighAccuracy: boolean = true,
  timeout: number = 5000,
  maximumAge: number = 0
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
