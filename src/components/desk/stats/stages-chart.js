import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const def = [
  {
    name: 'Инициализация',
    progress: 0,
    fill: '#8884d8'
  },
  {
    name: 'Планирование',
    progress: 0,
    fill: '#83a6ed'
  },
  {
    name: 'Релаизация',
    progress: 0,
    fill: '#8dd1e1'
  },
  {
    name: 'Тестирование',
    progress: 0,
    fill: '#82ca9d'
  },
  {
    name: 'Завершение',
    progress: 0,
    fill: '#a4de6c'
  }
]

export const StageChart = ({ data = def }) => {
  let stages = [{ name: 'Стадии' }]
  data.forEach(stage => {
    stages[0][stage.name] = Math.ceil(stage.progress)
  })

  let width = 600
  let height = 360
  let barWidth = 50

  if (window.matchMedia('(max-width: 600px)').matches) {
    width = 500
  }
  if (window.matchMedia('(max-width: 500px)').matches) {
    width = 400
    height = 300
    barWidth = 30
  }

  if (window.matchMedia('(max-width: 400px)').matches) {
    width = 320
    height = 300
    barWidth = 25
  }

  return (
    <BarChart
      width={width}
      height={height}
      data={stages}
      margin={{
        top: 30,
        right: 20,
        left: 10,
        bottom: 30
      }}
    >
      <XAxis dataKey="name" />
      <YAxis domain={[0, 100]} />
      <Tooltip />
      <Legend />
      {Object.keys(stages[0]).map(key => {
        if (key !== 'name') {
          return (
            <Bar
              key={key}
              maxBarSize={barWidth}
              dataKey={key}
              fill={data.filter(el => el.name === key)[0].color}
              background={{ fill: '#eee' }}
            />
          )
        }
      })}
    </BarChart>
  )
}
