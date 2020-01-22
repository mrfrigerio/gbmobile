import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import Icon from 'react-native-vector-icons/MaterialIcons'
import SignIn from '~/pages/SignIn'
import SignUp from '~/pages/SignUp'
import Dashboard from '~/pages/Dashboard'
import Profile from '~/pages/Profile'
import SelectProvider from '~/pages/New/SelectProvider'
import SelectDateTime from '~/pages/New/SelectDateTime'
import Confirm from '~/pages/New/Confirm'

const switchNavigator = createSwitchNavigator({
  SignIn,
  SignUp
})

const bottomTabNavigator = createBottomTabNavigator(
  {
    Dashboard,
    New: {
      screen: createStackNavigator(
        {
          SelectProvider,
          SelectDateTime,
          Confirm
        },
        {
          defaultNavigationOptions: {
            headerTransparent: true,
            headerTintColor: '#fff',
            headerLeftContainerStyle: {
              marginLeft: 20
            }
          }
        }
      ),
      navigationOptions: {
        tabBarVisible: false,
        tabBarLabel: 'Agendar',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="add-circle-outline" size={20} color={tintColor} />
        )
      }
    },
    Profile
  },
  {
    tabBarOptions: {
      keyboardHidesTabBar: true,
      activeTintColor: '#fff',
      inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
      style: {
        backgroundColor: '#8d41a8',
        borderTopWidth: 0
      }
    }
  }
)

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: switchNavigator,
        App: bottomTabNavigator
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign'
      }
    )
  )
