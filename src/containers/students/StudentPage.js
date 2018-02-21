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
import Button from 'material-ui/Button'
import './StudentPage.css'

//styling Paper
const paperStyle = {
  paddingTop: 100,
  paddingBottom: 25,
  paddingLeft: 25,
  paddingRight: 25,
  height: 500,
  width: 1350,
  margin: 16,
  display: 'inline-block',
}

export const studentShape = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequied,
    evaluations: PropTypes.array,
})

class StudentPage extends PureComponent {
  constructor(props) {
    super()
    const { name, photo, evaluatedAt, remark, code } = props
    this.state = {
      name,
      photo,
      evaluatedAt,
      remark,
      code,
      index: 0
    }
  }

  componentWillMount() {
    const batchId = this.props.match.params.batchId
    const studentId = this.props.match.params.studentId

    this.props.fetchOneBatch(batchId)
    this.props.fetchOneStudent(batchId, studentId)
  }

  checkColor(evaluation) {
    const colorCode = evaluation.code
    if (colorCode === "Y") return "#FFE66D"
    if (colorCode === "G") return "#4ECDC4"
    if (colorCode === "R") return "#FF6B6B"
    if (colorCode === 'W') return "#b3b6bc"
  }

  renderEvaluations(evaluation, index) {
    const evaluationId = evaluation._id
    return (
      <Button
        key={index}
        variant="flat"
        className="evaluation-code"
        style={{ backgroundColor:this.checkColor(evaluation), margin:1 }}
        onClick={() => this.handleClick(evaluationId)}></Button>
    )
  }

  selectEvaluation(evaluationId) {
    if (evaluationId === this.state.evaluation._id) {
      this.setState({ selectedEvaluationId: null })
    } else {
      this.setState({ selectedEvaluationId: evaluationId})
    }
  }

  handleClick = (evaluationId) => {
    this.selectEvaluation(evaluationId)
  }

// view selected evaluation details after pressing EDIT button
  viewSelectedEvaluation() {
    const { evaluations } = this.props.student
    evaluations.map(evaluation => {
      this.setState({
        evaluatedAt: this.state.evaluation.evaluatedAt,
        remark: this.state.evaluation.remark,
        code: this.state.evaluation.code
      })
    })
  }

//Edit student button??
  editStudent(evaluation) {
    this.setState({
      evaluatedAt: new Date(),
      remark: evaluation.remark
    })
  }

//Evaluation form textfield
  updateEvaluatedAt(date) {
    this.setState({
      evaluatedAt: date
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
    const { batch, student } = this.props
    let i = student.indexOf(this.state.index)

    if (i >= 0 && i < batch.students.length)
      this.setState({ index: i + 1 })

    const nextStudentId = student[this.state.index]._id
  }

  goToNextStudent = nextStudentId => event => {
    const { batchId, studentId } = this.props.match.params
    this.findNextStudent()
    this.props.replace(`/batches/${batchId}/students/${nextStudentId}`)
  }

  saveStudentAndNext() {
    this.saveStudent()
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
    const { _id, name, photo, evaluations } = this.props.student
    console.log(this.props)

    return(
        <Paper className="Result" style={paperStyle} elevation={2}>
            <div className="student-details">
              <Typography variant="headline">{ name }</Typography>
              <Typography variant="title">
                Batch# {this.props.batch && this.props.batch.title}
              </Typography>
              { photo && <img src={ photo } alt="Student Images"/> }
              <Typography variant="title">All Evaluations</Typography>
              { evaluations && evaluations.map(this.renderEvaluations.bind(this)) }
            </div>

          <div className="evaluation-form">
            <Typography variant="title">Daily Evaluation</Typography>
            <form onSubmit={this.saveStudent.bind(this)}>

              <div className="form">
                <TextField
                  id="evaluationDate"
                  label="Evaluation date"
                  type="date"
                  className="text-field"
                  value={this.state.evaluatedAt}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{marginTop: 20, marginBottom: 20}}
                  onChange={this.updateEvaluatedAt.bind(this)}
                  autoFocus
                  helperText="Default is set as today!"
                  fullWidth />

                <Typography variant="body1">Evaluation code for today</Typography>
                <Button
                  variant="raised"
                  className="red"
                  style={{margin:5, backgroundColor:"#FF6B6B", color:"#FFFFFF"}}
                  onClick={ this.setState({code:"R"}) }>Red</Button>

                <Button
                  variant="raised"
                  className="yellow"
                  style={{margin:5, backgroundColor:"#FFE66D", color:"#FFFFFF" }}
                  onClick={ this.setState({code:"Y"}) }>Yellow</Button>

                <Button
                  variant="raised"
                  className="green"
                  style={{ margin:5, backgroundColor:"#4ECDC4", color:"#FFFFFF" }}
                  onClick={ this.setState({code:"G"}) }>Green</Button>

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
                  rowsMax="4"
                  placeholder="Today's remarks"
                  fullWidth />

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

const mapStateToProps = state => ({
  batch: state.batches.selectedBatch,
  student: state.batches.selectedStudent,
})

export default connect(mapStateToProps, {
fetchOneBatch,
fetchOneStudent,
updateStudent,
clearStudent,
push,
replace
})(StudentPage)
