import * as Expo from 'expo'
import * as TaskManager from 'expo-task-manager'
import React from 'react'
import LogInPage from './components/log-in-page'
import LocationTask from './utils/location-task'

TaskManager.defineTask('LOCATION', LocationTask)

function App() {
  return <LogInPage />
}

export default Expo.registerRootComponent(App)
