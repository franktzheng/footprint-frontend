import moment from 'moment'
import React from 'react'
import { Image, View } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import FPBold from '../base/FPBold'
import FPText from '../base/FPText'

function RightFootprint({ date, emissions, onPress }) {
  const positive = emissions > 0
  return (
    <TouchableHighlight onPress={onPress} underlayColor="#ffffff">
      <View
        style={{
          paddingVertical: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: 96 + Math.random() * 96,
          flexDirection: 'row'
        }}
      >
        <Image
          source={require('../../assets/right-footprint.png')}
          style={{ width: 40, height: 88 }}
        />
        <View
          style={{ display: 'flex', flexDirection: 'column', marginLeft: 24 }}
        >
          <FPText>{moment(date).format('MMM D')}</FPText>
          <FPBold style={{ color: positive ? '#82E0AA' : '#EC7063' }}>
            {positive ? '+' : null}
            {Math.round(emissions)} g
          </FPBold>
        </View>
      </View>
    </TouchableHighlight>
  )
}

export default RightFootprint
