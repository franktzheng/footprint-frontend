import axios from 'axios'

const BASE_URL = 'http://footprint-ucla.herokuapp.com/api/users'

export async function getUser(id) {
  console.log({
    url: `${BASE_URL}/me`,
    data: { fb_id: id },
    method: 'GET'
  })
  const res = await axios({
    url: `${BASE_URL}/me`,
    data: { fb_id: id },
    method: 'GET'
  })
  return res.data
}

export async function postFootstep(id) {
  const res = await axios({
    url: `${BASE_URL}/footstep`,
    data: { fb_id: id },
    method: 'POST'
  })
  return res
}

export async function signIn(id, name) {
  const res = await axios({
    url: `${BASE_URL}/signup`,
    data: { fb_id: id, name },
    method: 'POST'
  })
  return res.data
}

export async function postTransportation(id, mode, distance) {
  console.log({
    url: `${BASE_URL}/transportation`,
    data: { fb_id: id, mode, distance, date: new Date().toDateString() },
    method: 'POST'
  })
  await axios({
    url: `${BASE_URL}/transportation`,
    data: { fb_id: id, mode, distance, date: new Date().toDateString() },
    method: 'POST'
  })
}

export async function postFood(id, items) {
  for (const item of items) {
    console.log({
      url: `${BASE_URL}/food`,
      data: {
        fb_id: id,
        foodName: item.name,
        servings: item.amount,
        date: new Date().toDateString()
      },
      method: 'POST'
    })
    await axios({
      url: `${BASE_URL}/food`,
      data: {
        fb_id: id,
        foodName: item.name,
        servings: item.amount,
        date: new Date().toDateString()
      },
      method: 'POST'
    })
  }
}
