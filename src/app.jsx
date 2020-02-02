import * as Expo from 'expo'
import * as Font from 'expo-font'
import * as Permissions from 'expo-permissions'
import * as TaskManager from 'expo-task-manager'
import React, { useEffect, useState } from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { UserProvider, useUser } from './context/user-context'
import CameraScreen from './screens/camera-screen'
import DayScreen from './screens/day-screen'
import FoodScreen from './screens/food-screen'
import HomeScreen from './screens/home-screen'
import LogInScreen from './screens/log-in-screen'
import ProfileScreen from './screens/profile-screen'
import TransportationScreen from './screens/transportation-screen'
import LocationTask from './utils/location-task'

console.disableYellowBox = true
TaskManager.defineTask('LOCATION', LocationTask)

const AuthNavigator = createStackNavigator({
  LogIn: { screen: LogInScreen }
})

const AppNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
  Day: { screen: DayScreen },
  Food: { screen: FoodScreen },
  Transportation: { screen: TransportationScreen },
  Camera: { screen: CameraScreen }
})

const AppContainer = createAppContainer(AppNavigator)
const AuthContainer = createAppContainer(AuthNavigator)

function App() {
  const { user, setUser, updateUser, setToken } = useUser()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      await Font.loadAsync({
        'source-sans-pro-semibold': require('../assets/fonts/SourceSansPro-SemiBold.ttf'),
        'source-sans-pro-regular': require('../assets/fonts/SourceSansPro-Regular.ttf')
      })
      await Permissions.askAsync(Permissions.CAMERA)
      // try {
      //   let id
      //   let name
      //   let token
      //   try {
      //     data = await logInWithFacebook()
      //     id = data.id
      //     name = data.name
      //     token = data.token
      //   } catch (err) {}
      //   if (id && name && token) {
      //     const user = await signIn(id, name)
      //     await postFootstep(id)
      //     setToken(token)
      //     setUser(user)
      //     await updateUser(id, name)
      //   }
      // } catch (err) {
      //   console.log(err)
      //   Alert.alert('Error!')
      // }
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
