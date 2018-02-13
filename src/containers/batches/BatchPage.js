import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import StudentItem from '../../containers/students/StudentItem'
import { studentShape } from '../../containers/students/StudentPage'
import { fetchOneBatch } from '../../actions/batches/fetch'
import StudentEditor from '../../containers/students/StudentEditor'
//material-ui & styling
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import '../students/StudentItem.css'
import './BatchPage.css'

//styling Paper
const style = {
  paddingTop: 16,
  paddingBottom: 16,
  height: 300,
  width: 1350,
  margin: 16,
  display: 'inline-block',
}

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
    fetchOneBatch: PropTypes.func.isRequied
  }

  componentWillMount() {
    this.props.fetchOneBatch(this.props.match.params.batchId)
  }

  renderStudent(student, index) {
    return <StudentItem key={index} batchId={this.props.match.params.batchId} { ...student } />
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
    const { students } = this.props.batch

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
    if (!this.props.batch) return null

    const { _id, title, students } = this.props.batch
    // console.log(this.props.match.params.batchId)
    const batchSize = students.length
    //make linerProgress
    const listOfLastColorCodes = students.map(student => student.evaluations[student.evaluations.length-1].code)

    const greenStudents = students.filter(student => student.evaluations[student.evaluations.length-1].code === "G")
    const redStudents = students.filter(student => student.evaluations[student.evaluations.length-1].code === "R")

    const greenPercentage = greenStudents.length/batchSize*100
    const redPercentage = redStudents.length/batchSize*100
    const yellowPercentage = 100-greenPercentage-redPercentage

    return (
      <article className="batch-page">
        <Paper style={style}>
          <div className="result-wrapper">
            <Typography variant="headline">Evaluation Overview in {title}</Typography>

            <div style={{overflow:"hidden", whiteSpace:"nowrap", marginTop:10}} >
              <div className="block G"></div> Green {greenPercentage}%
            </div>
            <div style={{overflow:"hidden", whiteSpace:"nowrap"}} >
              <div className="block Y"></div> Yellow {yellowPercentage}%
            </div>
            <div style={{overflow:"hidden", whiteSpace:"nowrap"}} >
              <div className="block R"></div> Red {redPercentage}%
            </div>

            <p>{listOfLastColorCodes}</p>
            <p>{this.getRandomStudent}</p>

            <div className="actions">
              <Link to="/random-result">
                <Button
                  variant="raised"
                  className="primary"
                  color="primary"
                  onClick={this.getRandomStudent.bind(this)}>Ask a question</Button>
              </Link>
            </div>
          </div>
          <StudentEditor />
        </Paper>

        <main className="students-wrapper">
          <Typography variant="display1" style={{marginLeft:20, marginTop: 20}}>Students Overview in {title}</Typography>
          <div className="students">
            {students.map(this.renderStudent.bind(this))}
          </div>
        </main>

      </article>
    )
  }
}

const mapStateToProps = state => ({
  batch: state.batches.selectedBatch
})

export default connect(mapStateToProps, { fetchOneBatch })(BatchPage)
