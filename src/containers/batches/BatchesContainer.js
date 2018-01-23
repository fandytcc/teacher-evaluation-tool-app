// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import BatchItem, { batchShape } from './BatchItem'
// import { push } from 'react-router-redux'
// import { fetchBatches } from '../../actions/batches/fetch'
// import fetchBatches, { fetchStudents } from '../actions/batches/fetch'
// import MenuItem from 'material-ui/MenuItem'
import './BatchesContainer.css'

class BatchesContainer extends PureComponent {
  static propTypes = {
    batches: PropTypes.arrayOf(batchShape).isRequired,
  }
  //
  // componentWillMount() {
  //   this.props.fetchBatches()
  // }

  renderBatch(batch, index) {
    return <BatchItem key={index} { ...batch } />
  }

  render() {
    return (
      <div className="batches wrapper">

        <h2>All Current Batches</h2>
        <div className="paper">
          { this.props.batches.map(this.renderBatch) }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ batches }) => ({ batches })
// const mapDispatchToProps = { fetchBatches, fetchStudents }

export default BatchesContainer
