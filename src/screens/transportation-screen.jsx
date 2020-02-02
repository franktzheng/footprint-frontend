import React, { useState } from 'react'
import { Button, Picker, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { useUser } from '../context/user-context'
import { postTransportation } from '../utils/request'

function TransportationScreen({ navigation }) {
  const { user, updateUser } = useUser()
  const options = [
    { label: 'Car', value: 'car' },
    { label: 'Walk', value: 'walk' },
    { label: 'Bike', value: 'bike' }
  ]
  const [selectedOption, setSelectedOption] = useState(options[0])
  const [distance, setDistance] = useState('')

  const handleSubmit = async () => {
    await postTransportation(user.fb_id, selectedOption.value, distance)
    await updateUser()
    navigation.navigate('Home')
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Picker
        selectedValue={selectedOption}
        onValueChange={itemValue => setSelectedOption(itemValue)}
      >
        {options.map(option => (
          <Picker.Item label={option.label} value={option.value} />
        ))}
      </Picker>
      <TextInput
        placeholder="Distance (mi)"
        style={{ borderWidth: 1, padding: 8 }}
        value={distance}
        onChangeText={text => setDistance(text)}
      />
      <Button title="Save" onPress={handleSubmit} />
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

export default TransportationScreen
