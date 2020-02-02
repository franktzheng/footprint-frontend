import moment from 'moment'
import React from 'react'
import { View } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import FPBold from '../base/FPBold'
import FPText from '../base/FPText'
import { useUser } from '../context/user-context'

function ProfileScreen() {
  const { user } = useUser()
  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: 24
      }}
    >
      <FontAwesome5Icon name="paw" size={128} style={{ marginBottom: 24 }} />
      <FPBold style={{ fontSize: 24, marginBottom: 24 }}>
        Welcome back {user.name.split(' ')[0]}!
      </FPBold>
      <FPBold>Date joined</FPBold>
      <FPText>{moment(user.dateJoined).format('MMMM D, YYYY')} </FPText>
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
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F3F4'
  },
  headerTitleStyle: {
    fontSize: 24,
    fontFamily: 'source-sans-pro-semibold'
  },
  headerTitleAlign: 'center'
}

export default ProfileScreen
