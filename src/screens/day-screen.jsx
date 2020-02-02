import moment from 'moment'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { PieChart } from 'react-native-svg-charts'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import FPBold from '../base/FPBold'
import FPText from '../base/FPText'

function DayScreen({ navigation }) {
  const footprint = navigation.getParam('footprint', undefined)

  const verbMap = {
    car: 'Car',
    bike: 'Bike',
    walk: 'Walk'
  }

  const transportationEmissions = Math.max(
    0,
    -1 *
      footprint.transportationLog.reduce(
        (acc, { emissions }) => acc + emissions,
        0
      )
  )
  const foodEmissions = Math.max(
    0,
    -1 * footprint.foodLog.reduce((acc, { emissions }) => acc + emissions, 0)
  )
  const data = [
    {
      key: 'Food',
      value: foodEmissions,
      svg: {
        fill: '#F06292'
      }
    },
    {
      key: 'Transportation',
      value: transportationEmissions,
      svg: {
        fill: '#FFD54F'
      }
    }
  ]

  useEffect(() => {
    if (footprint) {
      navigation.setParams({
        title: moment(footprint.date).format('MMMM D, YYYY')
      })
    }
  }, [footprint])

  return footprint ? (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{
          backgroundColor: '#ffffff'
        }}
      >
        <View style={{ flex: 1, padding: 24 }}>
          <FPBold style={{ fontSize: 20, marginBottom: 8 }}>
            Transportation Log
          </FPBold>
          {footprint.transportationLog.length == 0 && (
            <FPText>No transportation logs. </FPText>
          )}
          {footprint.transportationLog.map(({ mode, distance }) => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <FPText>{verbMap[mode]}</FPText>
              <FPText>
                {distance} mile{distance > 1 ? 's' : null}
              </FPText>
            </View>
          ))}
          <FPBold style={{ fontSize: 20, marginBottom: 8, marginTop: 12 }}>
            Food Log
          </FPBold>
          {footprint.foodLog.length == 0 && <FPText>No food logs.</FPText>}
          {footprint.foodLog.map(({ foodName, servings }) => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <FPText>
                {foodName.charAt(0).toUpperCase() + foodName.slice(1)}
              </FPText>
              <FPText>
                {servings} serving{servings > 1 ? 's' : null}
              </FPText>
            </View>
          ))}

          <FPBold
            style={{
              fontSize: 20,
              marginBottom:
                footprint.transportationLog.length == 0 &&
                footprint.foodLog.length == 0
                  ? 8
                  : 16,
              marginTop:
                footprint.transportationLog.length == 0 &&
                footprint.foodLog.length == 0
                  ? 12
                  : 18
            }}
          >
            Total Carbon Footprint
          </FPBold>
          {(footprint.transportationLog.length == 0 &&
            footprint.foodLog.length == 0) ||
          transportationEmissions + foodEmissions === 0 ? (
            <FPText>You have no net positive carbon emissions today.</FPText>
          ) : (
            <>
              <PieChart style={{ height: 200, marginBottom: 12 }} data={data} />
              <View>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                  }}
                >
                  <FontAwesome5Icon
                    name="square"
                    color="#F06292"
                    size={16}
                    solid
                  />
                  <FPText style={{ marginLeft: 8, fontSize: 16 }}>Food</FPText>
                </View>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                  }}
                >
                  <FontAwesome5Icon
                    name="square"
                    color="#FFD54F"
                    size={16}
                    solid
                  />
                  <FPText style={{ marginLeft: 8, fontSize: 16 }}>
                    Transportation
                  </FPText>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  ) : (
    <View>
      <Text>Error getting data for footprint</Text>
    </View>
  )
}

DayScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.state.params.title,
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
})

export default DayScreen
