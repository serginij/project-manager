export const handleErrors = response => {
  if (!response.ok) {
    throw response
  }
  return response
}

const baseUrl = 'http://localhost:3001'
// const baseUrl = 'https://project--manager.herokuapp.com'

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
