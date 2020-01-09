import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import SignIn from '~/pages/SignIn'
import SignUp from '~/pages/SignUp'
import Dashboard from '~/pages/Dashboard'

const switchNavigator = createSwitchNavigator({
  SignIn,
  SignUp
})

const bottomTabNavigator = createBottomTabNavigator({
  Dashboard
})

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: switchNavigator,
        App: bottomTabNavigator
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign'
      }
    )
  )
