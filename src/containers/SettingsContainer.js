
import { connect } from 'react-redux'
import {} from '../actions'

import Settings from 'components/Settings'

const mapStateToProps = state => {
  return {
    points: state.paths.past
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const SettingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)

export default SettingsContainer