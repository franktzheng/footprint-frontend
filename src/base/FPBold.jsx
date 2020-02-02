import React from 'react'
import { Text } from 'react-native'

function FPBold(props) {
  return (
    <Text
      {...props}
      style={{
        fontSize: 18,
        ...{ ...(props.style || null) },
        fontFamily: 'source-sans-pro-semibold'
      }}
    />
  )
}

export default FPBold
