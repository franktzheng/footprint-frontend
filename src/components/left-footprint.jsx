import moment from 'moment'
import React from 'react'
import { Image, View } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import FPBold from '../base/FPBold'
import FPText from '../base/FPText'

function LeftFootprint({ date, emissions, onPress }) {
  const positive = emissions > 0
  return (
    <TouchableHighlight onPress={onPress} underlayColor="#ffffff">
      <View
        style={{
          paddingVertical: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          paddingRight: 96 + Math.random() * 96
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginRight: 24
          }}
        >
          <FPText style={{ textAlign: 'right' }}>
            {moment(date).format('MMM D')}
          </FPText>
          <FPBold
            style={{
              color: positive ? '#82E0AA' : '#EC7063',
              textAlign: 'right'
            }}
          >
            {positive ? '+' : null}
            {Math.round(emissions)} g
          </FPBold>
        </View>
        <Image
          source={require('../../assets/left-footprint.png')}
          style={{ width: 40, height: 88 }}
        />
      </View>
    </TouchableHighlight>
  )
}

export default LeftFootprint
