import * as Expo from 'expo'
import * as Font from 'expo-font'
import * as TaskManager from 'expo-task-manager'
import React, { useEffect, useState } from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import DayScreen from './screens/day-screen'
import HomeScreen from './screens/home-screen'
import LogInScreen from './screens/log-in-screen'
import ProfileScreen from './screens/profile-screen'
import SettingsScreen from './screens/settings-screen'
import LocationTask from './utils/location-task'

TaskManager.defineTask('LOCATION', LocationTask)

const AuthNavigator = createStackNavigator({
  LogIn: { screen: LogInScreen }
})

const AppNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Settings: { screen: SettingsScreen },
  Profile: { screen: ProfileScreen },
  Day: { screen: DayScreen }
})

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      App: AppNavigator,
      Auth: AuthNavigator
    },
    {
      initialRouteName: 'App'
    }
  )
)

function App() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchFonts = async () => {
      await Font.loadAsync({
        'source-sans-pro-semibold': require('../assets/fonts/SourceSansPro-SemiBold.ttf'),
        'source-sans-pro-regular': require('../assets/fonts/SourceSansPro-Regular.ttf')
      })
      setLoading(false)
    }
    fetchFonts()
  }, [])
  return loading ? <Expo.AppLoading /> : <AppContainer />
}

export default Expo.registerRootComponent(App)
