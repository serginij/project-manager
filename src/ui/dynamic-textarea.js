/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react'

import { TextArea } from './text-area'

export const DynamicTextarea = React.forwardRef((props, ref) => {
  let { minRows, maxRows, onChange, curRows } = props

  let [rows, setRows] = useState(minRows)

  useEffect(() => {
    setRows(curRows)
  }, [curRows, minRows, props])

  let handleChange = e => {
    if (e.target.style.lineHeight === '') {
      // fix that
      console.log('change line-height', e.target.style)
      e.target.style.lineHeight = '20px'
    }
    let lineHeight = +e.target.style.lineHeight.slice(0, 2)
    // console.log(lineHeight, e.target.style.fontSize, rows)

    const previousRows = e.target.rows
    e.target.rows = minRows
    const currentRows = ~~(e.target.scrollHeight / lineHeight)

    if (currentRows === previousRows) {
      e.target.rows = currentRows
    }
    if (currentRows >= maxRows) {
      e.target.rows = maxRows
      e.target.scrollTop = e.target.scrollHeight
    }
    currentRows < maxRows ? setRows(currentRows) : setRows(maxRows)

    onChange && onChange(e, currentRows < maxRows ? currentRows : maxRows)
  }
  return (
    <TextArea
      {...props}
      ref={ref}
      onChange={handleChange}
      rows={rows}
      // autoHeight
    />
  )
})
