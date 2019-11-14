export const get = (url, options, auth) =>
  fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + auth
    }
  }).then(response => response.json())

export const post = (url, data, auth) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + auth
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .catch(error => error)

export const del = (url, data, auth) =>
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + auth
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .catch(error => console.log(error))

export const update = (url, data, auth) =>
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + auth
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .catch(error => console.log(error))
