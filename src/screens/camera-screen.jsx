import { Camera } from 'expo-camera'
import * as ImageManipulator from 'expo-image-manipulator'
import React, { useRef } from 'react'
import { Alert, View } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { postVision } from '../utils/request'

function CameraScreen() {
  const camera = useRef()
  const handleCapture = async () => {
    let photo = await camera.current.takePictureAsync()
    let resizedPhoto = await ImageManipulator.manipulateAsync(
      photo.uri,
      [{ resize: { width: 432, height: 768 } }],
      { compress: 0.5, format: 'jpeg', base64: true }
    )
    try {
      const data = await postVision(resizedPhoto.base64.replace(/\n/g, ''))
      Alert.alert('Yay', JSON.stringify(data))
    } catch (err) {
      console.log(err)
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
          alignItems: 'center'
        }}
      >
        <TouchableHighlight
          onPress={handleCapture}
          style={{
            backgroundColor: '#fff',
            height: 64,
            width: 64,
            borderRadius: 64
          }}
        ></TouchableHighlight>
      </View>
    </View>
  )
}

export default CameraScreen
