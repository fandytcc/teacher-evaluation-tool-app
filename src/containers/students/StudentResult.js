import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper'
import MenuItem from 'material-ui/MenuItem'
import BatchPage from '../../containers/batches/BatchPage'
import './StudentItem.css'

const style = {
  height: 400,
  width: 300,
  margin: 20,
  textAlign: 'left',
  display: 'inline-block',
}

class StudentResult extends PureComponent {

  render() {

    return (
      <Paper className="Result" style={style} elevation={2}>
      </Paper>
    )
  }
}

export default StudentResult
