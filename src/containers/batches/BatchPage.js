import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import StudentItem from '../../containers/students/StudentItem'
import { studentShape } from '../../containers/students/StudentPage'
import { fetchOneBatch } from '../../actions/batches/fetch'
// import StudentEditor from './StudentEditor'
import './BatchesContainer.css'

export const batchShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  students: PropTypes.arrayOf(studentShape),
  startDate: PropTypes.string,
  endDate: PropTypes.string,
})

class BatchPage extends PureComponent {
  static propTypes = {
    ...batchShape.isRequired,
  }

  // componentWillMount() {
  //   //this.props.dispatch(fetchRecipes())
  //   this.props.fetch() // see mapDispatchToProps below
  // }

  renderStudent(student, index) {
    return <StudentItem key={index} { ...student } />
  }

  render() {
    const { _id, title, students } = this.props
    if (!_id) return null

    return (
      <article className="batch-page">
        <header>
          <div className="result-wrapper">
            <p>R% Y% G%</p>
            <p>random student name & photo</p>
          </div>
        </header>

        <main className="students-wrapper">

          <h2>Students Overview in {title}</h2>
          <div className="students">
            {students.map(this.renderStudent)}
          </div>
        </main>
      </article>
    )
  }
}

const mapStateToProps = ({ batches }, { match }) => {
  const batch = batches.reduce((prev, next) => {
    if (next._id === match.params.batchId) {
      return next
    }
    return prev
  }, {})

  return {
    ...batch,
    batches,
  }
}

export default connect(mapStateToProps, { fetchOneBatch })(BatchPage)

// export default BatchPage
