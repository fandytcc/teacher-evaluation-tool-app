import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Title from '../../components/UI/Title'
// import { fetchOneGame, fetchStudents } from '../actions/batches/fetch'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem';

const style = {
  height: 300,
  width: 300,
  margin: 20,
  textAlign: 'left',
  display: 'inline-block',
};

export const batchShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  students: PropTypes.arrayOf(PropTypes.string),
  // startDate: PropTypes.string.isRequired,
  // endDate: PropTypes.string.isRequired,
})

class BatchItem extends PureComponent {
  static propTypes = {
    ...batchShape.isRequired,
  }

  render() {
    const { _id, title, students } = this.props

    return (
      <Paper className="BatchItem" style={style} zDepth={2}>
      <Menu>
        <Link to={`/batches/${_id}`}>
          <Title content={title} className="level-2" />
        </Link>
        <MenuItem primaryText= "students" />
      </Menu>
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
