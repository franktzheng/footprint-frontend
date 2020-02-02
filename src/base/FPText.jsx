import React from 'react'
import { Text } from 'react-native'

function FPText(props) {
  return (
    <Text
      {...props}
      style={{
        fontSize: 18,
        ...{ ...(props.style || null) },
        fontFamily: 'source-sans-pro-regular'
      }}
    />
  )
}

export default FPText
