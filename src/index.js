import React from 'react'
import { Provider } from 'react-redux'
import { StatusBar } from 'react-native'
import { PersistGate } from 'redux-persist/integration/react'
import '~/config/ReactotronConfig'
import { store, persistor } from '~/store'
import 'react-native-gesture-handler'
import App from './App'

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
        <App />
      </PersistGate>
    </Provider>
  )
}
