import React from 'react'
import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import { logInWithFacebook } from '../utils/facebook-log-in'

export default function LogInScreen({ navigation }) {
  const handleLogIn = async () => {
    try {
      const { id, name } = await logInWithFacebook()
      navigation.navigate('Home')
    } catch (err) {
      Alert.alert('Error', 'Sorry, we had trouble logging you in.')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome back!</Text>
      <Button onPress={handleLogIn} title="Log in with Facebook" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  header: {
    fontSize: 36,
    marginVertical: 18
  }
})
