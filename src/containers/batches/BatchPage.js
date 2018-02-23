import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import StudentItem from '../../containers/students/StudentItem'
import { studentShape } from '../../containers/students/StudentPage'
import { fetchOneBatch } from '../../actions/batches/fetch'
import StudentEditor from '../../containers/students/StudentEditor'
//material-ui & styling
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List'
import Dialog, { DialogTitle } from 'material-ui/Dialog'
import './BatchPage.css'

//styling Paper
const style = {
  height: 250,
  width: 300,
  display: 'inline-block',
  margin: 16,
  marginLeft: 90,
}

export const batchShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  students: PropTypes.arrayOf(studentShape),
  startDate: PropTypes.string,
  endDate: PropTypes.string,
})

class BatchPage extends PureComponent {
  state = {
    open: false,
  }

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
        result = greenStudents && greenStudents[randomNum].name
        result2 = greenStudents && greenStudents[randomNum].photo
      } else if (randomColor === "Y") {
        const randomNum = this.getRandomNum(0, yellowStudents.length-1)
        result = yellowStudents && yellowStudents[randomNum].name
        result2 = yellowStudents && yellowStudents[randomNum].photo
      } else if (randomColor === "R") {
        const randomNum = this.getRandomNum(0, redStudents.length-1)
        result = redStudents && redStudents[randomNum].name
        result2 = redStudents && redStudents[randomNum].photo
      }
      alert(result)
      alert(result2)
  }

//dialogue - ask a question
  // handleClose = () => {
  //   this.props.onClose(this.props.selectedValue);
  // }
  //
  // handleListItemClick = value => {
  //   this.props.onClose(value);
  // }

  render() {
    if (!this.props.batch) return null

    const { _id, title, students } = this.props.batch
    // console.log(this.props.match.params.batchId)
    const batchSize = students.length

    const greenStudents = students.filter(student => student.evaluations[student.evaluations.length-1].code === "G")
    const redStudents = students.filter(student => student.evaluations[student.evaluations.length-1].code === "R")
    const yellowStudents = students.filter(student => student.evaluations[student.evaluations.length-1].code === "Y")

    const greenPercentage = Math.round(greenStudents.length/batchSize*100)
    const redPercentage = Math.round(redStudents.length/batchSize*100)
    const yellowPercentage = Math.round(yellowStudents.length/batchSize*100)

    return (
      <article className="batch-page">
        <Paper style={style}>
          <div className="student-editor">
            <StudentEditor batchId={this.props.match.params.batchId} />
          </div>
        </Paper>

        <header className="blocks-wrapper">
          <Typography variant="display1">
            Students Overview in Batch#{title}
          </Typography>

          <Typography variant="display1" style={{float:'left', marginRight: 20}}>Evaluations Overview</Typography>

          <Button
            variant="raised"
            className="primary"
            color="primary"
            onClick={this.getRandomStudent.bind(this)}>
            Ask a question
          </Button>

          <div className="evaluation-overview">
            <div className="color-block" style={{width:`${greenPercentage}%`, background: "#4ECDC4"}}>
              <p>{greenPercentage ? greenPercentage : '0'}%</p>
            </div>

            <div className="color-block" style={{width:`${yellowPercentage}%`, background: "#FFE66D"}}>
              <p>{yellowPercentage ? yellowPercentage : '0'}%</p>
            </div>

            <div className="color-block" style={{width:`${redPercentage}%`, background: "#FF6B6B"}}>
              <p>{redPercentage ? redPercentage : '0'}%</p>
            </div>
          </div>
        </header>

        <main className="students-wrapper">
          <div className="students">
            {students.map(this.renderStudent.bind(this))}
          </div>
        </main>

      </article>
    )
  }
}

const mapStateToProps = state => ({
  batch: state.batches.selectedBatch,
})

export default connect(mapStateToProps, { fetchOneBatch })(BatchPage)
