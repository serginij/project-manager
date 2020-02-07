import React, { useState } from 'react'
import { styled } from 'linaria/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ru } from 'date-fns/esm/locale'
import { css } from 'linaria'
import { useSelector, useDispatch } from 'react-redux'

import { Dropdown, SaveCancelBlock } from '@ui'
import { updateCard } from '@symbiotes/effects'

export const AddDeadline = ({ children, startDate = new Date() }) => {
  let card = useSelector(state => state.cards.cards[state.cards.currentCard])

  let [date, setDate] = useState(new Date(startDate))
  let [time, setTime] = useState(
    date ? date.getHours() + ':' + date.getMinutes() : ''
  )
  let [error, setError] = useState({
    date: false,
    time: false
  })
  let [text, setText] = useState(
    date
      .toLocaleDateString()
      .split('/')
      .join('.')
  )

  const dispatch = useDispatch()

  const validTimeRegexp = new RegExp(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
  const validDateRegexp = new RegExp(
    /((0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.[2-9][0-9][2-9][0-9]$)/
  )

  const onDateChange = e => {
    let value = e.target.value
    if (!validDateRegexp.test(value)) {
      setError({ ...error, date: true })
    } else {
      setError({ ...error, date: false })
      let date = value.split('.')
      let newDate = new Date(date[2].slice(0, 4), +date[1] - 1, date[0])
      setDate(newDate)
    }

    setText(value)
  }

  const onTimeChange = e => {
    let value = e.target.value
    if (!validTimeRegexp.test(value)) {
      setError({ ...error, time: true })
    } else {
      setError({ ...error, time: false })
    }
    setTime(value)
  }

  const handleSubmit = e => {
    if (error.date || error.time) {
      e.preventDefault()
    } else {
      let newTime = time.split(':')
      let newDate = new Date(
        date.getYear(),
        date.getMonth(),
        date.getDate(),
        newTime[0],
        newTime[1]
      )
      card.deadline = newDate
      dispatch(updateCard(card))
    }
  }

  const handleCancel = () => {
    card.deadline = null
    dispatch(updateCard(card))
  }

  return (
    <Dropdown
      width={300}
      close={false}
      header={<Title>Срок выполнения</Title>}
      content={
        <>
          <Wrapper>
            <Label>
              Дата
              <Input
                error={error.date}
                type="text"
                onChange={onDateChange}
                value={text}
              />
            </Label>
            <Label>
              Время
              <Input
                error={error.time}
                type="text"
                onChange={onTimeChange}
                value={time}
                placeholder="00:00"
              />
            </Label>
          </Wrapper>
          <DatePicker
            inline
            onChange={date => setDate(date)}
            selected={date}
            minDate={new Date()}
            showDisabledMonthNavigation
            locale={ru}
            placeholderText="Weeks start on Monday"
            showMonthDropdown
            showYearDropdown
            // dropdownMode="select"
            className={datePicker}
            calendarClassName={datePicker}
            wrapperClassName={datePicker}
            // fixedHeight
          />
          <SaveCancelBlock
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            className={saveBlock}
          />
        </>
      }
    >
      {children}
    </Dropdown>
  )
}

const Title = styled.p`
  color: var(--gray-text);
  font-size: 14px;
  text-align: center;
  width: 100%;
`

const datePicker = css`
  width: 93%;

  margin: 10px;
  .react-datepicker__month-container {
    float: unset;
  }
`

const Input = styled.input`
  width: 100%;
  font-size: 14px;
  height: 2.5rem;
  border-radius: 3px;
  box-sizing: border-box;
  padding-left: 8px;
  margin-top: 8px;
  border: 3px solid
    ${props => (props.error ? 'var(--red)' : 'var(--dark-gray)')};

  &:focus {
    border: 3px solid var(--primary-color);
    outline: none;
  }
`

const Wrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 0 3.5%;
  justify-content: space-between;
  margin: 12px 0;
`

const Label = styled.label`
  font-size: 14px;
  color: var(--gray-text);
  display: flex;
  flex-direction: column;
  width: 40%;
`

const saveBlock = css`
  margin: 10px 0;
`
