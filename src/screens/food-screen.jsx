import React from 'react'
import { Button, Dimensions, Modal, Text, TextInput, View } from 'react-native'
import { useUser } from '../context/user-context'
import { postFood } from '../utils/request'

export default function FoodEvent({ navigation }) {
  const { user, updateUser } = useUser()
  const [foodValue, setFoodValue] = React.useState('')
  const [modalVisible, setModalVisible] = React.useState(false)
  const [servingCount, setServingCount] = React.useState(0)
  const [output, setOutput] = React.useState('')
  const [foods, setFoods] = React.useState([])
  const [foodAmounts, setFoodAmounts] = React.useState([])
  const [json, setjson] = React.useState([{ name: 'xd', amount: 1 }])

  const table = json.map((element, index) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <Text
          style={{
            fontSize: 16,
            paddingLeft: 20,
            paddingTop: 9
          }}
        >
          {element.name + ': ' + element.amount.toString() + ' servings'}
        </Text>
        <Button
          title="Delete"
          color="red"
          style={{
            paddingRight: 20
          }}
          onPress={function() {
            console.log(json)
            setjson(
              json.slice(0, index).concat(json.slice(index + 1, json.length))
            )
            // forceUpdate()
          }}
        />
      </View>
    )
  })

  let showModal = function(event) {
    setModalVisible(true)
  }

  let saveData = async function(event) {
    await postFood(user.fb_id, json)
    await updateUser()
    navigation.navigate('Home')
  }

  return (
    <View
      style={{
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent'
      }}
    >
      <View
        style={{
          margin: 0,
          width: '100%',
          textAlign: 'center',
          paddingTop: 50,
          flex: 1,
          backgroundColor: 'transparent'
        }}
      >
        <Text
          style={{
            margin: 'auto',
            textAlign: 'center',
            fontSize: 30,
            paddingBottom: 20
          }}
        >
          Food Entry
        </Text>

        <Button
          style={{}}
          title="Add New Item..."
          color="#006600"
          onPress={function() {
            setModalVisible(true)
          }}
        />
        <View>{table}</View>

        <Button
          style={{
            fontSize: 16,
            borderStyle: 'none',
            borderRadius: 15,
            paddingTop: 40,
            paddingBottom: 40,
            paddingLeft: 25,
            paddingRight: 25,
            textAlign: 'center',
            margin: 'auto'
          }}
          title="Save"
          onPress={function() {
            saveData()
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'transparent',
          justifyContent: 'flex-end'
        }}
      >
        <Modal
          visible={modalVisible}
          animationType={'fade'}
          transparent={true}
          onRequestClose={() => this.setModalVisible(false)}
        >
          <View
            style={{
              backgroundColor: 'lightblue',
              position: 'absolute',
              top: 300,
              left: Dimensions.get('window').width / 2 - 140,
              right: Dimensions.get('window').width / 2 - 140,
              justifyContent: 'center',
              alignItems: 'center',
              flex: 0
            }}
          >
            <Text
              style={{
                textAlign: 'left',
                fontSize: 24,
                fontWeight: 'bold',
                paddingTop: 20
              }}
            >
              Add Item
            </Text>
            <TextInput
              style={{
                textAlign: 'left',
                fontSize: 20,
                paddingVertical: 20
              }}
              placeholder="Food Item"
              onChangeText={function(text) {
                setFoodValue(text)
              }}
            />
            <Text
              style={{
                textAlign: 'left',
                fontSize: 20,
                paddingBottom: 20
              }}
            >
              Servings: {servingCount}
            </Text>
            <View style={{ width: 40, height: 40 }}>
              <Button
                style={{ paddingBottom: 20 }}
                onPress={function() {
                  setServingCount(servingCount + 1)
                }}
                title="+"
              />
            </View>
            <View style={{ width: 40, height: 40 }}>
              <Button
                style={{ paddingBottom: 20 }}
                onPress={function() {
                  setServingCount(servingCount - 1)
                }}
                title="-"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                paddingBottom: 20
              }}
            >
              <Button
                onPress={function() {
                  setFoods(foods.concat(foodValue))
                  console.log('food ' + foodValue)
                  console.log('servs ' + servingCount)
                  setFoodAmounts(foodAmounts.concat(servingCount))
                  setjson(
                    json.concat({ name: foodValue, amount: servingCount })
                  )
                  console.log(json)
                  setModalVisible(false)
                  setServingCount(0)
                }}
                title="Log"
                color="#006600"
                backgroundColor="red"
              />
              <Button
                onPress={function() {
                  setModalVisible(false)
                }}
                title="Cancel"
                color="red"
              />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  )
}
