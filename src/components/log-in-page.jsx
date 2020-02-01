import React from 'react'
import { Alert, Button, StyleSheet, View } from 'react-native'
import { logInWithFacebook } from '../utils/facebook-log-in'

export default function LogInPage() {
  const handleLogIn = async () => {
    try {
      const { id, name } = await logInWithFacebook()
      Alert.alert('Logged in!', `Hi ${name}!`)
    } catch (err) {}
  }

  return (
    <View style={styles.container}>
      <Button onPress={handleLogIn} title="Log in with Facebook" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
