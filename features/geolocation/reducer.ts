import { createReducer } from '@reduxjs/toolkit'
import { UpdateGeolocation } from './actions'
import { UpdateViewport } from './actions'

type IGeolocationState = {
  position: google.maps.LatLngLiteral | null
  viewportCenter: google.maps.LatLngLiteral | null
}

const initialState: IGeolocationState = {
  position: null,
  viewportCenter: null
}

export const geolocationReducer = createReducer(initialState, builder => {
  builder
    .addCase(UpdateGeolocation, (state, action) => {
      state.position = action.payload
    })
    .addCase(UpdateViewport, (state, action) => {
      state.viewportCenter = action.payload
    })
})
