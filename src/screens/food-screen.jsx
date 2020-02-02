import React from 'react'
import {
  Alert,
  Dimensions,
  Modal,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import FPBold from '../base/FPBold'
import FPText from '../base/FPText'
import { useUser } from '../context/user-context'
import { postFood } from '../utils/request'

export default function FoodScreen({ navigation }) {
  const { user, updateUser } = useUser()
  const [foodValue, setFoodValue] = React.useState('')
  const [modalVisible, setModalVisible] = React.useState(false)
  const [servingCount, setServingCount] = React.useState(1)
  const [output, setOutput] = React.useState('')
  const [foods, setFoods] = React.useState([])
  const [foodAmounts, setFoodAmounts] = React.useState([])
  const [json, setjson] = React.useState([{ name: 'xd', amount: 1 }])

  console.log(json)
  const table = json.map((element, index) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1
          }}
        >
          <FPText>
            {element.name.charAt(0).toUpperCase() + element.name.slice(1)}
          </FPText>
          <FPText>
            {element.amount.toString() +
              (element.amount !== 1 ? ' servings' : ' serving')}
          </FPText>
        </View>
        <TouchableHighlight
          underlayColor="#F2F3F4"
          onPress={() =>
            setjson(
              json.slice(0, index).concat(json.slice(index + 1, json.length))
            )
          }
          style={{
            backgroundColor: '#ffffff',
            padding: 8,
            borderRadius: 24,
            marginLeft: 8
          }}
        >
          <FontAwesome5Icon name="trash" size={24} color="#EC7063" solid />
        </TouchableHighlight>
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
        flex: 1,
        backgroundColor: '#fff',
        padding: 24
      }}
    >
      <FPBold style={{ marginBottom: 8 }}>Items</FPBold>
      <View>{table}</View>

      <View
        style={{
          margin: 0,
          width: '100%',
          textAlign: 'center',
          flex: 1,
          backgroundColor: 'transparent'
        }}
      >
        <TouchableHighlight
          style={{
            borderRadius: 8,
            marginHorizontal: -8,
            paddingHorizontal: 8
          }}
          color="#006600"
          underlayColor="#F1F2F3"
          onPress={function() {
            setModalVisible(true)
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 8
            }}
          >
            <FontAwesome5Icon name="plus" size={16} />
            <FPText style={{ marginLeft: 8 }}>Add new item</FPText>
          </View>
        </TouchableHighlight>

        <View style={{ display: 'flex', alignItems: 'center', marginTop: 24 }}>
          <TouchableHighlight
            underlayColor="#85C1E9"
            onPress={saveData}
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
          onRequestClose={() => setModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,10,20,0.7)'
            }}
          >
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                position: 'absolute',
                top: 150,
                left: Dimensions.get('window').width / 2 - 140,
                right: Dimensions.get('window').width / 2 - 140,
                flex: 0,
                padding: 24
              }}
            >
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 16
                }}
              >
                <FPBold
                  style={{
                    textAlign: 'left',
                    fontSize: 24
                  }}
                >
                  Add Item
                </FPBold>
              </View>

              <FPBold>Food item</FPBold>
              <TextInput
                autoFocus
                style={{
                  borderWidth: 2,
                  borderRadius: 8,
                  borderColor: '#AED6F1',
                  padding: 8,
                  marginBottom: 24
                }}
                value={foodValue}
                onChangeText={text => setFoodValue(text)}
              />

              <FPBold>Servings</FPBold>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 24
                }}
              >
                <TouchableHighlight
                  underlayColor="#F2F3F4"
                  onPress={() =>
                    servingCount > 1 && setServingCount(servingCount - 1)
                  }
                  style={{
                    backgroundColor: '#ffffff',
                    padding: 8,
                    borderRadius: 24
                  }}
                >
                  <FontAwesome5Icon name="minus" size={18} solid />
                </TouchableHighlight>
                <FPBold style={{ marginHorizontal: 18 }}>{servingCount}</FPBold>
                <TouchableHighlight
                  underlayColor="#F2F3F4"
                  onPress={() => setServingCount(servingCount + 1)}
                  style={{
                    backgroundColor: '#ffffff',
                    padding: 8,
                    borderRadius: 24
                  }}
                >
                  <FontAwesome5Icon name="plus" size={18} solid />
                </TouchableHighlight>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingBottom: 20
                }}
              >
                <TouchableHighlight
                  underlayColor="#E74C3C"
                  onPress={() => setModalVisible(false)}
                  style={{
                    backgroundColor: '#F1948A',
                    paddingVertical: 8,
                    paddingHorizontal: 24,
                    borderRadius: 8,
                    marginRight: 12
                  }}
                >
                  <FPBold style={{ textAlign: 'center' }}>Cancel</FPBold>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor="#85C1E9"
                  onPress={function() {
                    if (!foodValue) {
                      Alert.alert(
                        'Oops!',
                        'Please fill out the form correctly before saving.'
                      )
                      return
                    }
                    setFoods(foods.concat(foodValue))
                    setFoodAmounts(foodAmounts.concat(servingCount))
                    setjson(
                      json.concat({ name: foodValue, amount: servingCount })
                    )
                    setModalVisible(false)
                    setServingCount(1)
                    setFoodValue('')
                  }}
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
          </View>
        </Modal>
      </View>
    </View>
  )
}

FoodScreen.navigationOptions = {
  title: 'Log Food',
  headerStyle: {
    shadowOpacity: 0,
    shadowOffset: {
      height: 0
    },
    borderBottomWidth: 1,
    borderBottomColor: '#F2F3F4',
    // elevation is for Android
    elevation: 0
  },
  headerTitleStyle: {
    fontSize: 24,
    fontFamily: 'source-sans-pro-semibold'
  },
  headerTitleAlign: 'center'
}
