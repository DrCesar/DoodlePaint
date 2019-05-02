
import React from 'react'
import { combineReducers } from 'redux'
import { Path } from 'react-native-svg'

import {
  ADD_PATH,
  ADD_POINT,
  CLEAR_PATH
} from './actions'

import {
  pointsToSvg
} from 'components/Reaction'

function paths(
  state = {
    pathCount: 0,
    completed: [],  
    current: [],
    offsetX: 10,
    offsetY: 10,
    color: 'black'
  }, 
  action) 
{
  switch (action.type) {
    case ADD_POINT:
      return Object.assign({}, state, {
        current: [
          ...state.current,
          action.point
        ]
      })
    case ADD_PATH:
      return Object.assign({}, state, {
        pathCount: state.pathCount + 1,
        completed: [
          ...state.completed,
          (
            <Path
              key={state.pathCount}
              d={pointsToSvg(state.current)}
              stroke={state.color}
              fill="none"
            />
          )
        ],
        current: []
      })
    case CLEAR_PATH:
      return Object.assign({}, state, {
        completed: [],
        current: []
      })
    default:
      return state
  }
}

const doodlePaint = combineReducers({
  paths
})

export default doodlePaint
