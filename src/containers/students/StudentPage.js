import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push, replace } from 'react-router-redux'
import { fetchOneBatch, fetchOneStudent } from '../../actions/batches/fetch'
import { updateStudent, clearStudent } from '../../actions/batches/update'
//material-ui & styling
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
import ThumbsUpDownIcon from 'material-ui-icons/ThumbsUpDown'
import ThumbDownIcon from 'material-ui-icons/ThumbDown'
import ThumbUpIcon from 'material-ui-icons/ThumbUp'
import Tooltip from 'material-ui/Tooltip'
import './StudentPage.css'

//styling Paper
const paperStyle = {
  padding: 70,
  height: 600,
  width: 1250,
  margin: 20
}

export const studentShape = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequied,
    evaluations: PropTypes.array,
})

class StudentPage extends PureComponent {

  state = {
    name: "",
    photo:"",
    evaluatedAt: new Date(),
    remark:"",
    code:"",
    selected: false,
  }

//increase button size when selected
  // toggleClass() {
  //   const currentState = this.state.selected
  //   this.setState({
  //     selected: !currentState
  //   })
  // }

  componentWillMount() {
    const batchId = this.props.match.params.batchId
    const studentId = this.props.match.params.studentId

    this.props.fetchOneBatch(batchId)
    this.props.fetchOneStudent(batchId, studentId)
  }

  handleClick = (evaluationId) => {
    this.selectEvaluation(evaluationId)
  }

// view selected evaluation details after pressing EDIT button
  selectEvaluation(evaluationId) {
    const { evaluations } = this.props.student
    const selectedEvaluation = evaluations.filter(evaluation => evaluation._id === evaluationId)[0]

    this.setState({
      evaluatedAt: selectedEvaluation.evaluatedAt,
      remark: selectedEvaluation.remark,
      code: selectedEvaluation.code
    })
  }

  changeColor = (event) => {
    const color = event.currentTarget.value
    this.setState({code: color})
  }

  checkColor(evaluation) {
    const colorCode = evaluation.code
    if (colorCode === "Y") return "#FFE66D"
    if (colorCode === "G") return "#4ECDC4"
    if (colorCode === "R") return "#FF6B6B"
    if (colorCode === 'W') return "#b3b6bc"
  }

  renderEvaluations(evaluation) {
    const evaluationId = evaluation._id
    const evaluationDate = (new Date(evaluation.evaluatedAt)).toDateString()
    return (
      <Tooltip id="tooltip-bottom" title={evaluationDate} placement="bottom">
        <Button
          key={evaluationId}
          variant="flat"
          className="evaluation-code"
          style={{ backgroundColor:this.checkColor(evaluation), margin:1 }}
          onClick={() => this.handleClick(evaluationId)}>
        </Button>
      </Tooltip>
    )
  }

//Edit student button for name & photo only, use dialogue
  editStudent() {
    const { student } = this.props
    this.setState({
      name: student.name,
      photo: student.photo
    })
  }

//Evaluation form textfield
  updateEvaluatedAt(event) {
    this.setState({
      evaluatedAt: event.target.value
    })
  }

//validateRemark: compulsory field for yellow & red
  updateRemark(event) {
    this.setState({
      remark: event.target.value
    })
  }

  goToBatch() {
    const { batchId } = this.props.match.params
    this.props.push(`/batches/${batchId}`)
  }

//save student button
  saveStudent(event) {
    event.preventDefault()
    const { batchId, studentId } = this.props.match.params
    const studentUpdates = { ...this.state }
    this.props.updateStudent(batchId, studentId, studentUpdates)
    this.goToBatch()
  }

// save student and next button
  findNextStudent() {
    const { studentId } = this.props.match.params
    const { batch } = this.props

    let studentIndex = batch.students.findIndex(student => student._id === studentId)
    let nextStudentIndex = studentIndex + 1

    if (nextStudentIndex === batch.students.length) {
      return batch.students[0]._id
    } else {
      return batch.students[nextStudentIndex]._id
    }
  }

  goToNextStudent() {
    const { batchId } = this.props.match.params
    const nextStudentId = this.findNextStudent()
    this.props.replace(`/batches/${batchId}/students/${nextStudentId}`)
  }

  saveStudentAndNext(event) {
    this.saveStudent(event)
    this.goToNextStudent()
  }

//delete student button
  clearStudent() {
    const { batchId, studentId } = this.props.match.params
    this.props.clearStudent(batchId, studentId)
    this.goToBatch()
  }

  render() {
    if (!this.props.batch || !this.props.student) return null
    const { name, photo, evaluations } = this.props.student
    const { selected } = this.state
    console.log(this.props)

    return(
      <Paper className="student-container" style={paperStyle} elevation={2}>
        <div className="student-details">

          <div className="photo">
            { photo && <Avatar src={ photo } style={{width:200, height:200 }} alt="Student Images" /> }
          </div>

          <div className="info">
            <Typography variant="headline">{ name }</Typography>
            <Typography variant="title">
              Batch# {this.props.batch && this.props.batch.title}
            </Typography>
          </div>

          <div className="all-evaluations">
            <Typography variant="title">All Evaluations</Typography>
            { evaluations && evaluations.map(this.renderEvaluations.bind(this)) }
            <p className="notice">* hover the color block to see the evaluation date *</p>
          </div>

        </div>

      <div className="evaluation-form">
        <form onSubmit={this.saveStudent.bind(this)}>
          <Typography variant="title">Daily Evaluation for
            <TextField
              id="evaluationDate"
              type="date"
              className="text-field"
              value={this.state.evaluatedAt}
              InputLabelProps={{
                shrink: true,
              }}
              style={{marginLeft: 10, bottom: 3}}
              onChange={this.updateEvaluatedAt.bind(this)}
              autoFocus
              helperText="Default is set as today!"/>
          </Typography>

          <div className="today-evaluation">
            <div className="color-btns">
              <Tooltip id="tooltip-right" title="bad" placement="right">
                <Button
                  variant="raised"
                  value="R"
                  className={selected ? 'selected' : 'red'}
                  style={{margin:10, borderRadius: 60, height: 85, backgroundColor:"#FF6B6B", color:"#FFFFFF"}}
                  onClick={this.changeColor}>
                  <ThumbDownIcon />
                </Button>
              </Tooltip>

              <Tooltip id="tooltip-right" title="average" placement="right">
                <Button
                  key="yellow"
                  variant="raised"
                  value="Y"
                  className="yellow"
                  style={{margin:10,  borderRadius: 60, height: 85, backgroundColor:"#FFE66D", color:"#FFFFFF" }}
                  onClick={this.changeColor}>
                  <ThumbsUpDownIcon />
                </Button>
              </Tooltip>

              <Tooltip id="tooltip-right" title="good" placement="right">
                <Button
                  variant="raised"
                  value="G"
                  className="green"
                  style={{ margin:10,  borderRadius: 60, height: 85, backgroundColor:"#4ECDC4", color:"#FFFFFF" }}
                  onClick={this.changeColor}>
                  <ThumbUpIcon />
                </Button>
              </Tooltip>
            </div>

            <div className="remark">
              <TextField
                id="remark"
                className="remark"
                label="Remarks"
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
                value={ this.state.remark }
                onChange={ this.updateRemark.bind(this) }
                multiline
                rowsMax="8"
                placeholder="Today's remarks"
                fullWidth />
            </div>
          </div>

          <div className="submit-action">
            <Button
              variant="raised"
              className="submit-button"
              color="primary"
              style={{margin:5}}
              onClick={ this.clearStudent.bind(this) }>DELETE</Button>

            <Button
              variant="raised"
              className="submit-button"
              color="primary"
              style={{margin:5}}
              onClick={ this.editStudent.bind(this) }>EDIT</Button>

            <Button
              variant="raised"
              className="submit-button"
              color="primary"
              style={{margin:5}}
              onClick={ this.saveStudent.bind(this) }>SAVE</Button>

            <Button
              variant="raised"
              className="submit-button"
              color="primary"
              style={{margin:5}}
              onClick={this.saveStudentAndNext.bind(this)}>SAVE & NEXT</Button>
          </div>
        </form>
      </div>
      </Paper>
    )
  }
}

const mapStateToProps = ( { batches }, { match }) => ({
  batch: batches.selectedBatch,
  student: batches.selectedStudent
})

//job-to-be-done... change all match.params.studentId to student._id: find student under fetchOneBatch to ensure rendering of next student works..
// const mapStateToProps = ( { batches }, { match }) => ({
//   batch: batches.selectedBatch,
//   student: batches.studentsPerBatch.find(student => student._id === match.params.studentId)
// })

export default connect(mapStateToProps, {
fetchOneBatch,
fetchOneStudent,
updateStudent,
clearStudent,
push,
replace
})(StudentPage)
