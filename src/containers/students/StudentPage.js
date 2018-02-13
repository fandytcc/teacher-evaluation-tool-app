import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
// import Title from '../../components/UI/Title'
import { fetchBatches, fetchOneStudent } from '../../actions/batches/fetch'
import { updateStudent, clearStudent } from '../../actions/batches/update'
//material-ui & styling
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import './StudentPage.css'

//styling Paper
const style = {
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

    const { evaluatedAt, remark, code } = props

    this.state = {
      evaluatedAt,
      remark,
      code
    }
  }

  componentWillMount() {
    const batchId = this.props.match.params.batchId
    const studentId = this.props.match.params.studentId

    this.props.fetchOneStudent(batchId, studentId)
  }

  checkColor(evaluation) {
    const colorCode = evaluation.code
    if (colorCode === "Y") return "#f1f495"
    if (colorCode === "G") return "#9ed1a7"
    if (colorCode === "R") return "#f24232"
  }

  renderEvaluations(evaluation, index) {
    return (
      <Button
        key={index}
        variant="flat"
        className="evaluation-code"
        style={{ backgroundColor: this.checkColor(evaluation), margin:1 }}></Button>
    )
  }
  // onClick={this.updateStudent(evaluation).bind(this)}

  // goToBatch(event) {
  //   const { batchId } = this.props.match.params
  //   this.props.push(`/batches/${batchId}`)
  // }

  // goToStudent = studentId => event => this.props.push(`${studentId}`)

//delete student button
  clearStudent(event) {
    const { batchId, studentId } = this.props.match.params
    this.props.clearStudent(batchId, studentId)
  }

//Edit student button
  updateEvaluatedAt(event, date) {
    this.setState({
      evaluatedAt: date
    })
  }

  updateRemark(event) {
    this.setState({
      remark: event.target.value
    })
  }

  updateStudent(event, evaluation) {
    this.setState({
      evaluatedAt: Date.now,
      remark: evaluation.remark
    })
  }

//save studnet button
  saveStudent(event) {
    event.preventDefault()
    const { studentId, _id } = this.props.student
    const { code, remark, evaluatedAt } = this.state
    const student = {
      _id: studentId,
      ...this.state,
     }
    this.props.updateStudent(student)
  }

//save student and next button
  saveStudentAndNext() {
    const { batchId, studentId } = this.props.match.params
    const { code, remark, evaluatedAt } = this.state
    const student = { ...this.state }
    this.props.updateStudent(student)
  }

  render() {
    if (!this.props.student) return null
    const { _id, name, photo, evaluations } = this.props.student
    console.log(this.props.student)

    return(
        <Paper className="Result" style={style} zDepth={2}>

          <div className="student-details">
            <Typography variant="title">
              {this.props.batch && this.props.batch.title}
            </Typography>
            <Typography variant="headline">{ name }</Typography>
              { photo && <img src={ photo } alt="Student Images"/> }
            <Typography variant="title">All Evaluations</Typography>
            { evaluations.map(this.renderEvaluations.bind(this)) }
          </div>

          <div className="evaluation-form">
            <Typography variant="title">Daily Evaluation</Typography>
            <form onSubmit={this.saveStudent.bind(this)}>

              <div className="form">
                <TextField
                  id="evaluationDate"
                  label="Evaluation date (default is set as today)"
                  type="date"
                  className="text-field"
                  autoOk={true}
                  fullWidth={true}
                  defaultValue={Date.now}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{marginTop: 20, marginBottom: 20}}
                  onChange={this.updateEvaluatedAt.bind(this)}
                  onKeyDown={this.updateEvaluatedAt.bind(this)} />

                <Typography variant="body1">Evaluation code for today</Typography>
                <Button
                  variant="raised"
                  className="red"
                  style={{margin:5, backgroundColor:"#D32F2F", color: "#DEDEDE"}}
                  onClick={this.setState({ code:"#D32F2F"})}>Red</Button>

                <Button
                  variant="raised"
                  className="yellow"
                  style={{margin:5, backgroundColor:"#f1f495", color: "#DEDEDE"}}
                  onClick={this.setState({ code:"#f1f495"})}>Yellow</Button>

                <Button
                  variant="raised"
                  className="green"
                  style={{margin:5, backgroundColor:"#00AA86", color:"#DEDEDE"}}
                  onClick={this.setState({ code:"#00AA86"})}>Green</Button>

                <TextField
                  type="text"
                  id="remark"
                  className="remark"
                  label="Remarks for this student"
                  multiLine={true}
                  rows={2}
                  rowsMax={4}
                  fullWidth={true}
                  value={this.state.remark}
                  onChange={this.updateRemark.bind(this)}
                  onKeyDown={this.updateRemark.bind(this)} />
              </div>

              <div className="submit-action">
                <Button
                  variant="raised"
                  className="submit-button"
                  color="primary"
                  style={{margin:5}}
                  onClick={this.clearStudent.bind(this)}>DELETE</Button>

                <Button
                  variant="raised"
                  className="submit-button"
                  color="primary"
                  style={{margin:5}}
                  onClick={this.updateStudent.bind(this)}>EDIT</Button>

                <Button
                  variant="raised"
                  className="submit-button"
                  color="primary"
                  style={{margin:5}}
                  onClick={this.saveStudent.bind(this)}>SAVE</Button>

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
fetchBatches,
fetchOneStudent,
updateStudent,
clearStudent,
push
})(StudentPage)
