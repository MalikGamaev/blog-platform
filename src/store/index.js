import { configureStore } from '@reduxjs/toolkit'

import articleReducer from './reducers/articleReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    article: articleReducer,
    user: userReducer,
  },
})

export default store
