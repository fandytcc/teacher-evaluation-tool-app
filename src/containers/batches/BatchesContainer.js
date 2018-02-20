import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { push } from 'react-router-redux'
import BatchItem from './BatchItem'
import BatchEditor from './BatchEditor'
import { batchShape } from './BatchPage'
import { fetchBatches } from '../../actions/batches/fetch'
import Typography from 'material-ui/Typography'
import './BatchesContainer.css'

class BatchesContainer extends PureComponent {
  static PropTypes = {
    batches: PropTypes.arrayOf(batchShape).isRequired,
  }

  componentWillMount() {
    this.props.fetchBatches()
  }

  renderBatch(batch, index) {
    return <BatchItem key={index} { ...batch } />
  }

  render() {
    if (!this.props.batches) return null

    return (
      <div className="batches-wrapper" style={{margin:20}}>
        <BatchEditor />

        <Typography variant="display1" style={{textAlign:"center"}}>All Current Batches</Typography>

        <div className="batches">
          { this.props.batches.map(this.renderBatch) }
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  batches: state.batches.allBatches
})
// const mapDispatchToProps = { fetchBatches, fetchStudents }

export default connect(mapStateToProps, { fetchBatches })(BatchesContainer)
