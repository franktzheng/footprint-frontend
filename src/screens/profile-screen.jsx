import React from 'react'
import { Text, View } from 'react-native'

function ProfileScreen() {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  )
}

ProfileScreen.navigationOptions = {
  title: 'My Profile',
  headerStyle: {
    shadowOpacity: 0,
    shadowOffset: {
      height: 0
    },
    // elevation is for Android
    elevation: 0
  },
  headerTitleStyle: {
    fontSize: 24,
    fontFamily: 'source-sans-pro-semibold'
  },
  headerTitleAlign: 'center',
  borderBottomWidth: 1,
  borderBottomColor: '#F2F3F4'
}

export default ProfileScreen
