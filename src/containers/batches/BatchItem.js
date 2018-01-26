import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { batchShape } from './BatchPage'
import Title from '../../components/UI/Title'
import Paper from 'material-ui/Paper'

const style = {
  height: 250,
  width: 300,
  margin: 20,
  textAlign: 'left',
  display: 'inline-block',
};

class BatchItem extends PureComponent {
  static propTypes = {
    ...batchShape.isRequired,
}

  render() {
    const { _id, title, students } = this.props

    return (
      <Paper className="BatchItem" style={style} zDepth={2}>
        <Link to={`/batches/${_id}`}>
          <Title content={title} className="level-2" />
        </Link>
        <div style={{textAlign: 'left', paddingLeft: 30}}>
          <p>{ students.length } students</p>
        </div>
      </Paper>
    )
  }
}

export default BatchItem
