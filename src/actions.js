
export const ADD_PATH = 'ADD_PATH'
export const ADD_POINT = 'ADD_POINT'
export const CLEAR_PATH = 'CLEAR_PATH'

export function addPath() {
  return {
    type: ADD_PATH
  }
}

export function addPoint(point) {
  return {
    type: ADD_POINT,
    point
  }
}

export function clearCanvas() {
  return {
    type: CLEAR_PATH
  }
}