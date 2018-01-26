import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import StudentItem from '../../containers/students/StudentItem'
import { studentShape } from '../../containers/students/StudentPage'
import { fetchOneBatch } from '../../actions/batches/fetch'
import StudentEditor from '../../containers/students/StudentEditor'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import '../students/StudentItem.css'

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
    result: PropTypes.string,
  }

  componentWillMount() {
    this.props.fetchOneBatch(this.props.match.params.batchId)
  }

  renderStudent(student, index) {
    return <StudentItem key={index} { ...student } />
  }

  createWeightedList(list, weight) {
    const weightedList = []

    for (let i=0; i < weight.length; i++) {
      let multiples = weight[i] * 100

      for (let j=0; j < multiples; j++) {
        weightedList.push(list[i])
      }
    }
    return weightedList
  }

  getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  getRandomStudent(event) {
    event.preventDefault()
    const { students } = this.props

    const colorList = ["G", "Y", "R"]
    const weight = [0.21, 0.32, 0.47]
    const weightedList = this.createWeightedList(colorList, weight)
    const randomNum = this.getRandomNum(0, weightedList.length-1)
    const randomColor = weightedList[randomNum]

    const greenStudents = students.filter(student => student.evaluations[student.evaluations.length-1].code === "G")
    const yellowStudents = students.filter(student => student.evaluations[student.evaluations.length-1].code === "Y")
    const redStudents = students.filter(student => student.evaluations[student.evaluations.length-1].code === "R")

    let result =""
    let result2 = ""
      if (randomColor === "G") {
        const randomNum = this.getRandomNum(0, greenStudents.length-1)
        result = greenStudents[randomNum].name
        result2 = greenStudents[randomNum].photo
      } else if (randomColor === "Y") {
        const randomNum = this.getRandomNum(0, yellowStudents.length-1)
        result = yellowStudents[randomNum].name
        result2 = greenStudents[randomNum].photo
      } else if (randomColor === "R") {
        const randomNum = this.getRandomNum(0, redStudents.length-1)
        result = redStudents[randomNum].name
        result2 = greenStudents[randomNum].photo
      }
      alert(result)
      alert(result2)
  }

  render() {
    const { _id, title, students } = this.props
    if (!_id) return null

    const batchSize = students.length
    const listOfLastColorCodes = students.map(student => student.evaluations[student.evaluations.length-1].code)

    const greenStudents = students.filter(student => student.evaluations[student.evaluations.length-1].code === "G")
    const redStudents = students.filter(student => student.evaluations[student.evaluations.length-1].code === "R")

    const greenPercentage = greenStudents.length/batchSize*100
    const redPercentage = redStudents.length/batchSize*100
    const yellowPercentage = 100-greenPercentage-redPercentage

    return (
      <article className="batch-page">
        <header>
          <Paper className="result-wrapper" style={{ width: 600, display: 'inline-block' }}>
            <h2>Evaluation Overview in {title}</h2>

            <div style={{overflow:"hidden", whiteSpace:"nowrap"}} >
              <div className="block G"></div> Green {greenPercentage}%
            </div>
            <div style={{overflow:"hidden", whiteSpace:"nowrap"}} >
              <div className="block Y"></div> Yellow {yellowPercentage}%
            </div>
            <div style={{overflow:"hidden", whiteSpace:"nowrap"}} >
              <div className="block R"></div> Red {redPercentage}%
            </div>

            <p>random student name & photo</p>
            <p>{listOfLastColorCodes}</p>
            <p>{this.getRandomStudent}</p>

            <div className="actions">
            <Link to="/random-result">
              <RaisedButton
                className="primary"
                primary={true}
                onClick={this.getRandomStudent.bind(this)}
                label="Ask a question"/>
            </Link>
            </div>
          </Paper>

          <div className="student-editor">
            <StudentEditor />
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
    ...batch
  }
}

export default connect(mapStateToProps, { fetchOneBatch, push })(BatchPage)
