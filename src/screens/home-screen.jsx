import moment from 'moment'
import React from 'react'
import { TouchableHighlight, View } from 'react-native'
import ActionButton from 'react-native-action-button'
import { ScrollView } from 'react-native-gesture-handler'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import LeftFootprint from '../components/left-footprint'
import RightFootprint from '../components/right-footprint'

const data = []

for (let i = 0; i < 15; i++) {
  data.push({
    id: i,
    date: moment().add(-1 * i, 'days'),
    emissions: (Math.random() - 0.5) * 50
  })
}

function HomeScreen({ navigation }) {
  return (
    <View>
      <ScrollView
        overScrollMode={'never'}
        vertical={true}
        contentContainerStyle={{
          paddingVertical: 32,
          backgroundColor: '#ffffff'
        }}
      >
        {data.map(({ id, date, emissions }) =>
          moment([2000, 1, 1]).diff(moment(date), 'days') % 2 == 0 ? (
            <LeftFootprint
              key={id}
              onPress={() => navigation.navigate('Day', { id })}
              date={date}
              emissions={emissions}
            />
          ) : (
            <RightFootprint
              key={id}
              onPress={() => navigation.navigate('Day', { id })}
              date={date}
              emissions={emissions}
            />
          )
        )}
      </ScrollView>
      <ActionButton
        hideShadow={true}
        buttonColor="#80CBC4"
        renderIcon={() => <FontAwesome5 name="plus" color="#ffffff" />}
      >
        <ActionButton.Item
          textContainerStyle={{ borderWidth: 0 }}
          textStyle={{ fontFamily: 'source-sans-pro-regular', fontSize: 14 }}
          buttonColor="#80CBC4"
          title="Log Transportation"
          onPress={() => {}}
        >
          <FontAwesome5 name="car" color="#ffffff" />
        </ActionButton.Item>
        <ActionButton.Item
          textContainerStyle={{ borderWidth: 0 }}
          textStyle={{ fontFamily: 'source-sans-pro-regular', fontSize: 14 }}
          buttonColor="#80CBC4"
          title="Log Food"
          onPress={() => {}}
        >
          <FontAwesome5 name="carrot" color="#ffffff" />
        </ActionButton.Item>
      </ActionButton>
    </View>
  )
}

HomeScreen.navigationOptions = ({ navigation }) => ({
  title: 'My Journey',
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
  headerTitleAlign: 'center',
  headerRight: () => {
    return (
      <TouchableHighlight
        underlayColor="#F2F3F4"
        onPress={() => navigation.navigate('Settings')}
        style={{
          backgroundColor: '#ffffff',
          padding: 8,
          borderRadius: 24,
          marginRight: 8
        }}
      >
        <FontAwesome5 name="cog" size={24} color="#80CBC4" />
      </TouchableHighlight>
    )
  },
  headerLeft: () => {
    return (
      <TouchableHighlight
        underlayColor="#F2F3F4"
        onPress={() => navigation.navigate('Profile')}
        style={{
          backgroundColor: '#ffffff',
          padding: 8,
          borderRadius: 24,
          marginLeft: 8
        }}
      >
        <FontAwesome5 name="user-circle" size={24} color="#80CBC4" solid />
      </TouchableHighlight>
    )
  }
})

export default HomeScreen