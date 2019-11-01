import React, { useState } from 'react'

import { useDispatch } from 'react-redux'

import { addDesk } from '@symbiotes/effects'

export const CreateDesk = props => {
  const [value, setValue] = useState('')

  const dispatch = useDispatch()

  const handleChange = e => {
    setValue(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(addDesk(value)).then(props.history.push('/'))
  }

  return (
    <div>
      <h2>Create desk</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Desk name
          <input type="text" id="name" value={value} onChange={handleChange} />
        </label>
        <button>Add</button>
      </form>
    </div>
  )
}
