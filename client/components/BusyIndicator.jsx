import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const BusyIndicator = ({ busy }) => {
  return (
    <div className='busy-indicator'>
      {busy && <img src='/animated-circle.gif' />}
    </div>
  )
}

BusyIndicator.propTypes = {
  busy: PropTypes.bool
}

function mapStateToProps ({ busy }) {
  return { busy }
}

export default connect(mapStateToProps)(BusyIndicator)
