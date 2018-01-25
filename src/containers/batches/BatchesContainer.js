import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { push } from 'react-router-redux'
import BatchItem from './BatchItem'
import BatchEditor from './BatchEditor'
import { batchShape } from './BatchPage'
import { fetchBatches } from '../../actions/batches/fetch'
import './BatchesContainer.css'

class BatchesContainer extends PureComponent {
  static propTypes = {
    batches: PropTypes.arrayOf(batchShape).isRequired,
  }

  componentWillMount() {
    this.props.fetchBatches()
  }

  renderBatch(batch, index) {
    return <BatchItem key={index} { ...batch } />
  }

  render() {
    return (
      <div className="batches-wrapper">
        <BatchEditor />

        <h2>All Current Batches</h2>

        <div className="batches">
          { this.props.batches.map(this.renderBatch) }
        </div>

      </div>
    )
  }
}

const mapStateToProps = ({ batches }) => ({ batches })
// const mapDispatchToProps = { fetchBatches, fetchStudents }

export default connect(mapStateToProps, { fetchBatches })(BatchesContainer)
