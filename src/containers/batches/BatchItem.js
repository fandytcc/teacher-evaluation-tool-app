import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Title from '../../components/UI/Title'
// import { fetchOneGame, fetchStudents } from '../actions/batches/fetch'
import Paper from 'material-ui/Paper'
// import Menu from 'material-ui/Menu'
// import MenuItem from 'material-ui/MenuItem'

const style = {
  height: 250,
  width: 300,
  margin: 20,
  textAlign: 'left',
  display: 'inline-block',
};

class BatchItem extends PureComponent {

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

// const mapStateToProps = ({ batches }, { match }) => {
//   const batch = batches.filter((b) => (b._id === match.params.batchId))[0]
//   const batchSize = batch.students.length
//   return {
//     batchSize
//   }
// }

export default BatchItem
