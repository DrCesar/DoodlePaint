
import { connect } from 'react-redux'
import { addPath, addPoint } from '../actions'

import Canvas from 'components/Canvas'


const mapStateToProps = state => {
  return {
    completed: state.paths.completed,
    current: state.paths.current
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPath: () => dispatch(addPath()),
    addPoint: point => dispatch(addPoint(point))
  }
}

const CanvasContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas)

export default CanvasContainer