/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react'

import { TextArea } from './text-area'

export const DynamicTextarea = React.forwardRef((props, ref) => {
  let { minRows, maxRows, onChange } = props

  let [rows, setRows] = useState(minRows)

  useEffect(() => {
    setRows(minRows)
  }, [minRows])

  let handleChange = e => {
    if (e.target.style.lineHeight === '') {
      // fix that
      console.log('change line-height', e.target.style)
      e.target.style.lineHeight = '20px'
    }
    let lineHeight = +e.target.style.lineHeight.slice(0, 2)
    // console.log(lineHeight, e.target.style.fontSize, rows)

    const previousRows = event.target.rows
    event.target.rows = minRows
    const currentRows = ~~(event.target.scrollHeight / lineHeight)

    if (currentRows === previousRows) {
      event.target.rows = currentRows
    }
    if (currentRows >= maxRows) {
      event.target.rows = maxRows
      event.target.scrollTop = event.target.scrollHeight
    }
    currentRows < maxRows ? setRows(currentRows) : setRows(maxRows)

    onChange(e)
  }
  return (
    <TextArea
      ref={ref}
      onChange={handleChange}
      rows={rows}
      autoHeight
      {...props}
    />
  )
})
