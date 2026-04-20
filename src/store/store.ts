import { configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './features/auth/auth.slice'
import { baseAPI } from './api/baseApi'

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'accessToken'] // ❌ refreshToken remove
}

const persistedReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    auth: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(baseAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store);




// // update code 
// import { configureStore } from '@reduxjs/toolkit'
// import {
//   FLUSH,
//   PAUSE,
//   PERSIST,
//   persistReducer,
//   persistStore,
//   PURGE,
//   REGISTER,
//   REHYDRATE
// } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
// import authReducer from './features/auth/auth.slice'
// import { baseAPI } from './api/baseApi'


// const persistConfig = {
//   key: 'auth',
//   storage,
//   whitelist: ['user', 'accessToken', 'refreshToken']
// }

// const persistedReducer = persistReducer(persistConfig, authReducer)

// export const store = configureStore({
//   reducer: {
//     [baseAPI.reducerPath]: baseAPI.reducer,
//     auth: persistedReducer,
//   },
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
//       }
//     }).concat(baseAPI.middleware)
// })

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
// export const persistor = persistStore(store);




// previous code
// import { configureStore } from '@reduxjs/toolkit'
// import {
//   FLUSH,
//   PAUSE,
//   PERSIST,
//   persistReducer,
//   persistStore,
//   PURGE,
//   REGISTER,
//   REHYDRATE
// } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
// import authReducer from './features/auth/auth.slice'
// import { baseAPI } from './api/baseApi'



// const persistConfig = {
//   key: 'auth',
//   storage
// }

// const persistedReducer = persistReducer(persistConfig, authReducer)


// export const store = configureStore({
//   reducer: {
//     [baseAPI.reducerPath]: baseAPI.reducer,
//     auth: persistedReducer,
//   },
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
//       }
//     }).concat(baseAPI.middleware)
// })

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
// export const persistor = persistStore(store)