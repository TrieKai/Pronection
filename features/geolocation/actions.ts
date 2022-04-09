import { createAction } from '@reduxjs/toolkit'

export const UpdateGeolocation =
  createAction<google.maps.LatLngLiteral>('geolocation/update')

export const UpdateViewport =
  createAction<google.maps.LatLngLiteral>('viewport/update')
