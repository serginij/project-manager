import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { parseMindmap } from '@symbiotes/effects/'
import { history } from '@lib/routing'

import MindMap from './mindmap'

export const MindMapWrapper = () => {
  const teamId = useSelector(state => state.teams.currentTeam)
  const desk = useSelector(state =>
    state.desks.currentDesk ? state.desks.desks[state.desks.currentDesk] : null
  )
  const dispatch = useDispatch()

  const handleConvert = tree => {
    dispatch(parseMindmap(tree, teamId))
  }

  if (!(history.location.state || desk)) {
    history.push('/')
  }

  let name = history.location.state && history.location.state.name

  let { innerWidth } = window

  let mindmap = {}
  let nodes = []

  if (desk) {
    let deskWidth = desk.mindmap.data.name.length * 7 + 55
    let deskCoords = { x: innerWidth / 2 - deskWidth / 2, y: 80 }
    let data = { ...desk.mindmap.data, x: deskCoords.x, y: deskCoords.y }
    nodes.push(data)
    mindmap = {
      ...desk.mindmap,
      data,
      children: desk.mindmap.children.map((column, colIndex) => {
        let deskStep = innerWidth / desk.mindmap.children.length
        let columnWidth = column.data.name.length * 7 + 55
        let colCoords = {
          x: (colIndex + 1 / 2) * deskStep - columnWidth / 2,
          y: 160
        }
        data = {
          ...column.data,
          x: colCoords.x,
          y: colCoords.y,
          startX: deskCoords.x + deskWidth / 2,
          startY: deskCoords.y + 25
        }
        nodes.push(data)
        return {
          ...column,
          data,
          children: column.children.map((card, cardIndex) => {
            let cardStep = deskStep / column.children.length
            let cardWidth = column.data.name.length * 7 + 55
            let cardCoords = {
              x:
                (cardIndex + 1 / 2) * cardStep -
                cardWidth / 2 +
                deskStep * colIndex,
              y: 240
            }
            data = {
              ...card.data,
              x: cardCoords.x,
              y: cardCoords.y,
              startX: colCoords.x + columnWidth / 2,
              startY: colCoords.y + 25
            }
            nodes.push(data)
            return {
              ...card,
              data,
              children: card.children.map((item, itemIndex) => {
                let itemCoords = {
                  x: cardCoords.x + cardWidth / 2,
                  y: cardCoords.y + (itemIndex + 1) * 80
                }
                data = {
                  ...item.data,
                  x: itemCoords.x - (cardWidth / 10) * itemIndex,
                  y: itemCoords.y,
                  // startX: cardCoords.x + cardWidth / 2,
                  startX: cardCoords.x,
                  startY: cardCoords.y + 25
                }
                nodes.push(data)
                return {
                  ...item,
                  data
                }
              })
            }
          })
        }
      })
    }
  } else {
    mindmap = {
      data: {
        name: name,
        id: 1,
        x: innerWidth / 2 - 20,
        y: 80,
        color: '000000'
      },
      level: 1,
      children: []
    }
    nodes = [
      { name: name, id: 1, x: innerWidth / 2 - 20, y: 80, color: '000000' }
    ]
  }

  const handleSave = tree => {
    console.log(tree)
  }

  return (
    <MindMap
      onConvert={handleConvert}
      onSave={handleSave}
      mindmap={mindmap}
      nodes={nodes}
      editable={!desk}
    />
  )
}
