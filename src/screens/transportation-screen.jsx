import React, { useState } from 'react'
import { Alert, Picker, View } from 'react-native'
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler'
import FPBold from '../base/FPBold'
import { useUser } from '../context/user-context'
import { postTransportation } from '../utils/request'

function TransportationScreen({ navigation }) {
  const { user, updateUser } = useUser()
  const options = [
    { label: 'Car', value: 'car' },
    { label: 'Walk', value: 'walk' },
    { label: 'Bike', value: 'bike' }
  ]
  const [selectedOption, setSelectedOption] = useState(options[0].value)
  const [distance, setDistance] = useState('')

  const handleSubmit = async () => {
    if (!selectedOption || !distance || distance <= 0) {
      console.log(distance, selectedOption)
      Alert.alert('Oops!', 'Please fill out the form correctly before saving.')
      return
    }
    await postTransportation(user.fb_id, selectedOption, distance)
    await updateUser()
    navigation.navigate('Home')
  }

  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: '#ffffff' }}>
      <FPBold>Mode of Transportation</FPBold>
      <View
        style={{
          borderWidth: 2,
          borderRadius: 8,
          borderColor: '#AED6F1',
          marginBottom: 12,
          marginTop: 8
        }}
      >
        <Picker
          selectedValue={selectedOption}
          onValueChange={itemValue => {
            setSelectedOption(itemValue)
            // console.log(itemLabel)
          }}
        >
          {options.map(option => (
            <Picker.Item label={option.label} value={option.value} />
          ))}
        </Picker>
      </View>
      <FPBold>Distance (mi)</FPBold>
      <TextInput
        style={{
          borderWidth: 2,
          borderRadius: 8,
          borderColor: '#AED6F1',
          padding: 8,
          marginBottom: 24
        }}
        value={distance}
        onChangeText={text => setDistance(text)}
      />
      <View style={{ display: 'flex', alignItems: 'center' }}>
        <TouchableHighlight
          underlayColor="#85C1E9"
          onPress={handleSubmit}
          style={{
            backgroundColor: '#AED6F1',
            paddingVertical: 8,
            paddingHorizontal: 24,
            borderRadius: 8
          }}
        >
          <FPBold style={{ textAlign: 'center' }}>Save</FPBold>
        </TouchableHighlight>
      </View>
    </View>
  )
}

TransportationScreen.navigationOptions = {
  title: 'Log Transportation',
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

export default TransportationScreen
