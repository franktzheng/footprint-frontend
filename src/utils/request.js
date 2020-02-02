import data from '../../mock-data.json'

export function getUserData(id) {
  return data.users.filter(user => user.fb_id == id)[0]
}
