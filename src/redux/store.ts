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

// import authReducer from '@/store/features/auth/auth.slice'
// import { baseAPI } from '@/store/api/baseApi'

// // Import your reducers

// // Persist config for auth
// const persistConfig = {
//   key: 'auth',
//   storage,
//   whitelist: ['user', 'accessToken'] 
// }

// const persistedReducer = persistReducer(persistConfig, authReducer)

// export const store = configureStore({
//   reducer: {
//     [baseAPI.reducerPath]: baseAPI.reducer, // RTK Query API
//     auth: persistedReducer,
//     // subscription: subscriptionReducer,
//     // appointmentTypes: appointmentTypesReducer,
//     // chat: chatReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         // Ignore redux-persist actions
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
//       }
//     }).concat(baseAPI.middleware) // Add RTK Query middleware
// })

// // Types
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

// // Persistor
// export const persistor = persistStore(store)