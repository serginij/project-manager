export const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.message)
  }
  return response
}

// const baseUrl = 'http://192.168.128.208:3000'
const baseUrl = 'http://localhost:3000'

export const get = (url, options, auth) =>
  fetch(baseUrl + url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + auth
    }
  })
    .then(response => response.json())
    .then(handleErrors)

export const post = (url, data, auth) =>
  fetch(baseUrl + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + auth
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(handleErrors)

export const del = (url, data, auth) =>
  fetch(baseUrl + url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + auth
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(handleErrors)

export const update = (url, data, auth) =>
  fetch(baseUrl + url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + auth
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(handleErrors)
