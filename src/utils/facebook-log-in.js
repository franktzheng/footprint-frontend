export async function logInWithFacebook() {
  await Facebook.initializeAsync('611775999619124')
  const { type, token } = await Facebook.logInWithReadPermissionsAsync({
    permissions: ['public_profile']
  })
  if (type === 'success') {
    // Get the user's name using Facebook's Graph API
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}`
    )
    const data = await response.json()
    return data
  }
  throw new Error('Error logging in with Facebook.')
}
