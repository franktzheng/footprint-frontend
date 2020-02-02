import * as Expo from 'expo'
import * as Font from 'expo-font'
import * as TaskManager from 'expo-task-manager'
import React, { useEffect, useState } from 'react'
import { Alert, AsyncStorage } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { UserProvider, useUser } from './context/user-context'
import DayScreen from './screens/day-screen'
import HomeScreen from './screens/home-screen'
import LogInScreen from './screens/log-in-screen'
import ProfileScreen from './screens/profile-screen'
import SettingsScreen from './screens/settings-screen'
import { getUserId } from './utils/facebook-log-in'
import LocationTask from './utils/location-task'
import { getUserData } from './utils/request'

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

const AppContainer = createAppContainer(AppNavigator)
const AuthContainer = createAppContainer(AuthNavigator)

function App() {
  const { user, setUser } = useUser()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      await Font.loadAsync({
        'source-sans-pro-semibold': require('../assets/fonts/SourceSansPro-SemiBold.ttf'),
        'source-sans-pro-regular': require('../assets/fonts/SourceSansPro-Regular.ttf')
      })
      const token = await AsyncStorage.getItem('userToken')
      try {
        const id = await getUserId(token)
        const user = await getUserData(id)
        setUser(user)
      } catch (err) {
        Alert.alert('Error!')
      }
      setLoading(false)
    }
    fetchData()
  }, [])
  return loading ? (
    <Expo.AppLoading />
  ) : user ? (
    <AppContainer />
  ) : (
    <AuthContainer />
  )
}

function AppWrapper() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  )
}

export default Expo.registerRootComponent(AppWrapper)
