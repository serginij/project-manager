import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { parseMindmap } from '@symbiotes/effects/'

import MindMap from './mindmap'

export const MindMapWrapper = () => {
  const teamId = useSelector(state => state.teams.currentTeam)
  const dispatch = useDispatch()

  const handleConvert = tree => {
    dispatch(parseMindmap(tree, teamId))
  }

  const handleSave = tree => {
    console.log(tree)
  }

  return <MindMap onConvert={handleConvert} onSave={handleSave} />
}
