import { Camera } from 'expo-camera'
import * as ImageManipulator from 'expo-image-manipulator'
import React, { useRef, useState } from 'react'
import { ActivityIndicator, Alert, View } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { useUser } from '../context/user-context'
import { postVision } from '../utils/request'

function CameraScreen({ navigation }) {
  const camera = useRef()
  const [loading, setLoading] = useState(false)
  const { user, updateUser } = useUser()

  const handleCapture = async () => {
    setLoading(true)
    let photo = await camera.current.takePictureAsync()
    let resizedPhoto = await ImageManipulator.manipulateAsync(
      photo.uri,
      [{ resize: { width: 324, height: 576 } }],
      { compress: 0.5, format: 'jpeg', base64: true }
    )
    try {
      const detectedFoods = await postVision(
        user.fb_id,
        resizedPhoto.base64.replace(/\n/g, '')
      )
      if (detectedFoods.length === 0) {
        throw new Error()
      }
      Alert.alert(
        'Success!',
        'We added the following items to your food log: ' +
          detectedFoods.join(', ') +
          '.'
      )
      await updateUser()
      navigation.navigate('Home')
    } catch (err) {
      Alert.alert(
        'Error',
        'We had trouble identifying this food. Please enter it manually.'
      )
      await updateUser()
      navigation.navigate('Home')
    }
  }
  return (
    <View style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
      <Camera
        ref={camera}
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
      />
      <View
        style={{
          height: 96,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#5D6D7E'
        }}
      >
        <TouchableHighlight
          underlayColor="#CCD1D1"
          onPress={handleCapture}
          style={{
            backgroundColor: '#fff',
            height: 64,
            width: 64,
            borderRadius: 64
          }}
        >
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1
            }}
          >
            {loading && <ActivityIndicator size="large" color="#80CBC4" />}
          </View>
        </TouchableHighlight>
      </View>
    </View>
  )
}

CameraScreen.navigationOptions = {
  title: 'Scan Food',
  headerStyle: {
    shadowOpacity: 0,
    shadowOffset: {
      height: 0
    },
    // elevation is for Android
    elevation: 0,
    backgroundColor: '#5D6D7E'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'source-sans-pro-semibold'
  },
  headerTitleAlign: 'center'
}

export default CameraScreen
