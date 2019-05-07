
import React from 'react'
import { combineReducers } from 'redux'
import { Path } from 'react-native-svg'

import {
  ADD_PATH,
  ADD_POINT,
  CLEAR_PATH,
  SET_SESSION
} from './actions'

import {
  pointsToSvg
} from 'components/Reaction'

function paths(
  state = {
    pathCount: 0,
    completed: [],  
    current: [],
    past: [],
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
        current: [],
        past: state.current
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


function image(
  state = {
    session: '',
    size: [],
    strokeWidth: []
  },
  action)
{
  switch (action) {
    case SET_SESSION:
      return Object.assign({}, state, {
        session: action.session
      })
    default:
      return state
  }
}

const doodlePaint = combineReducers({
  paths,
  image
})

export default doodlePaint
