import React from 'react'
import { Alert, View } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FPBold from '../base/FPBold'
import FPText from '../base/FPText'
import { logInWithFacebook } from '../utils/facebook-log-in'

function LogInScreen({ navigation }) {
  const handleLogIn = async () => {
    try {
      const { id, name } = await logInWithFacebook()
      navigation.navigate('Home')
    } catch (err) {
      Alert.alert('Error', 'Sorry, we had trouble logging you in.')
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#EAEDED',
        alignItems: 'center',
        fontFamily: 'source-sans-pro-semibold',
        justifyContent: 'center'
      }}
    >
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <FontAwesome5
          name="paw"
          size={32}
          color="#5D6D7E"
          style={{ paddingTop: 6 }}
        />
        <FPBold style={{ marginLeft: 12, fontSize: 36, marginBottom: 12 }}>
          Footprint
        </FPBold>
      </View>
      <FPText style={{ marginBottom: 96 }}>
        Saving Mother Earth, one step at a time.
      </FPText>
      <TouchableHighlight
        underlayColor="#F2F3F4"
        onPress={handleLogIn}
        style={{ backgroundColor: '#ffffff', padding: 12, borderRadius: 10 }}
      >
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <FontAwesome5 name="facebook-f" size={18} color="#1778f2" />
          <FPBold style={{ marginLeft: 12, fontSize: 18 }}>
            Sign in with Facebook
          </FPBold>
        </View>
      </TouchableHighlight>
    </View>
  )
}

LogInScreen.navigationOptions = {
  title: 'Footprint',
  headerShown: false
}

export default LogInScreen
