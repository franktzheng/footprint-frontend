import * as Expo from 'expo'
import * as TaskManager from 'expo-task-manager'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from './components/home-screen'
import LogInScreen from './components/log-in-screen'
import LocationTask from './utils/location-task'

TaskManager.defineTask('LOCATION', LocationTask)

const AuthNavigator = createStackNavigator({
  LogIn: { screen: LogInScreen }
})

const AppNavigator = createStackNavigator({
  Home: { screen: HomeScreen }
})

const App = createAppContainer(
  createSwitchNavigator(
    {
      App: AppNavigator,
      Auth: AuthNavigator
    },
    {
      initialRouteName: 'Auth'
    }
  )
)

export default Expo.registerRootComponent(App)
