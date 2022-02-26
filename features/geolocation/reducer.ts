import { createReducer } from '@reduxjs/toolkit'
import { UpdateGeolocation } from './actions'

type IGeolocationState = {
  position: google.maps.LatLngLiteral | null
}

const initialState: IGeolocationState = {
  position: null
}

export const geolocationReducer = createReducer(initialState, builder => {
  builder.addCase(UpdateGeolocation, (state, action) => {
    state.position = action.payload
  })
})
