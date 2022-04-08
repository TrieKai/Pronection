import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { geolocationReducer } from 'features/geolocation'
import { loadingReducer } from 'features/loading'

const combinedReducer = combineReducers({
  geolocation: geolocationReducer,
  loading: loadingReducer
})

const reducer: typeof combinedReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload // apply delta from hydration
    }
    return nextState
  } else {
    return combinedReducer(state, action)
  }
}

const makeStore = () =>
  configureStore({
    reducer
  })

type Store = ReturnType<typeof makeStore>

export type AppDispatch = Store['dispatch']
export type RootState = ReturnType<Store['getState']>

export const Wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV === 'development'
})
