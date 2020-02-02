import React from 'react'
import { Text, View } from 'react-native'

function DayScreen({ navigation }) {
  return (
    <View>
      <Text>Day Screen</Text>
      <Text>{navigation.getParam('id', 0)}</Text>
    </View>
  )
}

export default DayScreen
