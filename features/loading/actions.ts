import { createAction } from '@reduxjs/toolkit'

export const SetLoading = createAction<boolean>('loading/set')
