import React, { useEffect } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { useSelector } from 'react-redux'

import { getProgress } from '@lib/get-progress'
import { stages } from '@lib/constants'
import { history } from '@lib/routing'
import { getLifeCycle } from '@lib/get-life-model'
import { Progress, FormWrapper as Wrapper } from '@ui'

import { StageChart } from './stages-chart'

export const Stats = () => {
  const desk = useSelector(state => state.desks.desks[state.desks.currentDesk])
  const { columns } = useSelector(state => state.columns)
  const { cards } = useSelector(state => state.cards)

  useEffect(() => {
    if (!desk) {
      history.replace('/')
    }
  }, [desk])

  let progress = 0
  let total = 0
  const stagesProgress = {}
  stages.forEach(stage => {
    stagesProgress[stage.id] = { value: 0, total: 0, progress: 0 }
  })

  desk &&
    desk.columns.forEach(colId => {
      columns[colId].cards.forEach(cardId => {
        console.log(cards[cardId])
        let card = cards[cardId]
        let res = getProgress(card.checklists)
        progress += res.value
        total += res.total
        if (card.stage) {
          let stage = { ...stagesProgress[card.stage] }
          stage.value += res.value
          stage.total += res.total
          stage.progress =
            stage.total > 0 ? (stage.value / stage.total) * 100 : 0
          stagesProgress[card.stage] = stage
        }
      })
    })
  console.log(progress, total)

  let lifeCycle = getLifeCycle(Object.values(stagesProgress)).map(stage => (
    <Text key={stage}>{stage}</Text>
  ))

  const stats = stages.map(({ id, color, name }) => (
    <>
      <h3>{name}</h3>
      <Progress color={color} progress={stagesProgress[id].progress} />
    </>
  ))
  return (
    <Wrapper className={wrapperStyle}>
      <Title>Статистика выполнения стадий проекта</Title>
      <h2>Выполнение проекта</h2>
      <Progress
        color="var(--primary)"
        progress={total ? (progress / total) * 100 : 0}
      />
      {stats}
      <h3>Предполагаемые модель жизненного цикла</h3>
      {lifeCycle}
      <StageChart data={Object.values(stagesProgress)} />
    </Wrapper>
  )
}

const wrapperStyle = css`
  text-align: left;
  max-width: 70%;
`

const Title = styled.h1`
  text-align: center;
`

const Text = styled.p``
