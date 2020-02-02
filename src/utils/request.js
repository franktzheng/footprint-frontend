import axios from 'axios'

const BASE_URL = 'http://footprint-ucla.herokuapp.com/api'

export async function postVision(img) {
  console.log({
    url: `${BASE_URL}/vision`,
    data: { img },
    method: 'POST'
  })
  const res = await axios({
    url: `${BASE_URL}/vision`,
    data: { img },
    method: 'POST'
  })
  return res.data
}

export async function postFootstep(id) {
  const res = await axios({
    url: `${BASE_URL}/users/footstep`,
    data: { fb_id: id },
    method: 'POST'
  })
  return res
}

export async function signIn(id, name) {
  const res = await axios({
    url: `${BASE_URL}/users/signup`,
    data: { fb_id: id, name },
    method: 'POST'
  })
  return res.data
}

export async function postTransportation(id, mode, distance) {
  await axios({
    url: `${BASE_URL}/users/transportation`,
    data: { fb_id: id, mode, distance, date: new Date().toDateString() },
    method: 'POST'
  })
}

export async function postFood(id, items) {
  for (const item of items) {
    await axios({
      url: `${BASE_URL}/users/food`,
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
