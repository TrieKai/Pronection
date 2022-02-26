import { createAction } from '@reduxjs/toolkit'

export const UpdateGeolocation =
  createAction<google.maps.LatLngLiteral>('geolocation/update')
