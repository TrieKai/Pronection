import { createReducer } from '@reduxjs/toolkit'
import { SetLoading } from './actions'

type ILoadingState = {
  status: boolean
}

const initialState: ILoadingState = {
  status: false
}

export const loadingReducer = createReducer(initialState, builder => {
  builder.addCase(SetLoading, (state, action) => {
    state.status = action.payload
  })
})
