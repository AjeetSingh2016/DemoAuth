import { View, Text } from 'react-native'
import React from 'react'
import Main from './Main'
import { Provider } from 'react-redux'
import Store from "./src/redux/store/Store"

const App = () => {
  return (
    <Provider store={Store}>
      <Main />
    </Provider>
  )
}

export default App