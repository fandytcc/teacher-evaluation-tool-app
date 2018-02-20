import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { batchShape } from './BatchPage'
//material-ui
import Title from '../../components/UI/Title'
import Paper from 'material-ui/Paper'

//style Paper
const style = {
  height: 250,
  width: 300,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block'
}

class BatchItem extends PureComponent {
  static propTypes = {
    ...batchShape.isRequired,
}

  render() {
    const { _id, title, students, startDate, endDate } = this.props
    const startDateString = (new Date(startDate)).toDateString()
    const endDateString = (new Date(endDate)).toDateString()

    return (
      <Paper className="BatchItem" style={style} elevation={2}>
        <Link to={`/batches/${_id}`}>
          <Title content={`Batch #${title}`} className="level-2" />
        </Link>
        <div style={{textAlign: 'center'}}>
          <p>{ students.length } students</p>
          <p>Start Date: { startDateString } </p>
          <p>End Date: { endDateString } </p>
        </div>
      </Paper>
    )
  }
}

export default BatchItem
