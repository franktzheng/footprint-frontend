import * as Facebook from 'expo-facebook'
import ENV from '../../env.js'

export async function logInWithFacebook() {
  await Facebook.initializeAsync(ENV.FACEBOOK_APP_ID)
  const { type, token } = await Facebook.logInWithReadPermissionsAsync({
    permissions: ['public_profile']
  })
  if (type === 'success') {
    // Get the user's name using Facebook's Graph API
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}`
    )
    const data = await response.json()
    return { ...data, token }
  }
  throw new Error('Error logging in with Facebook.')
}

export async function getUserId(token) {
  const response = await fetch(
    `https://graph.facebook.com/me?access_token=${token}`
  )
  const data = await response.json()
  return data.id
}
