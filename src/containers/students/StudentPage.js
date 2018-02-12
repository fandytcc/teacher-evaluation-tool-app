import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Title from '../../components/UI/Title'
import { fetchBatches, fetchOneStudent } from '../../actions/batches/fetch'
import { updateStudent, clearStudent } from '../../actions/batches/update'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import './StudentItem.css'

const style = {
  height: 800,
  width: 600,
  margin: 20,
  textAlign: 'left',
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

  // updateStudent(event, evaluations) {
  //   this.setState({
  //     evaluatedAt: Date.now,
  //     remark: evaluations.remark
  //   })
  // }

  saveStudent(event) {
    event.preventDefault()

    const { batchId, studentId } = this.props
    const { code, remark, evaluatedAt } = this.state
    const student = {
      ...this.state,
      id: studentId,
     }
    this.props.updateStudent(student)
  }

  goToBatch(event) {
    const { batchId } = this.props.match.params
    this.props.push(`/batches/${batchId}`)
  }

  saveStudentAndNext() {
    const { batchId, studentId } = this.props.match.params
    const { code, remark, evaluatedAt } = this.state
    const student = { ...this.state }
    this.props.updateStudent(student)
  }

  goToStudent = studentId => event => this.props.push(`${studentId}`)

  clearStudent(event) {
    const { batchId, studentId } = this.props.match.params
    this.props.clearStudent(batchId, studentId)
  }

  renderEvaluations(evaluation, index) {
    const colorCode = evaluation.code
    return (
      <RaisedButton
        key={index}
        className="evaluation-code"
        backgroundColor={colorCode}
        />
    )
  }

          // onClick={this.updateStudent(evaluation).bind(this)}

  render() {
    if (!this.props.student) return null
    const { _id, name, photo, evaluations } = this.props.student
    console.log(this.props.batch)

    const allColorCodes = evaluations.map(evaluation => evaluation.code)

    console.log(this.props.student)
    return(
        <Paper className="Result" style={style} zDepth={2}>
          <div className="student-details">
            <h3>Student name: { name }</h3>
            <h3>All Evaluations: { allColorCodes }</h3>
            <div>
              { photo && <img src={ photo } alt="Student Images"/> }
            </div>
            <h3>{this.props.batch && this.props.batch.title}</h3>
            <div>
              { evaluations.map(this.renderEvaluations.bind(this)) }
            </div>
          </div>

          <div className="evaluation-form">
            <h2>Daily Evaluation</h2>
            <form onSubmit={this.saveStudent.bind(this)}>
              <div className="form">
                <DatePicker
                  hintText="Evaluation date (default is set as today)"
                  ref="evaluatedAt"
                  className="evaluationDate"
                  autoOk={true}
                  fullWidth={true}
                  defaultValue={Date.now}          onChange={this.updateEvaluatedAt.bind(this)}
                  onKeyDown={this.updateEvaluatedAt.bind(this)} />
                <RaisedButton
                  className="red"
                  backgroundColor="#f24232"
                  style={{margin:5}}
                  onClick={this.setState({ code:"#f24232"})}
                  label="Red"/>
                <RaisedButton
                  className="yellow"
                  backgroundColor="#f1f495"
                  style={{margin:5}}
                  onClick={this.setState({ code:"#f1f495"})}
                  label="Yellow"/>
                <RaisedButton
                  className="green"
                  backgroundColor="#9ed1a7"
                  style={{margin:5}}
                  onClick={this.setState({ code:"#9ed1a7"})}
                  label="Green"/>
                <TextField
                  type="text"
                  ref="remark"
                  className="remark"
                  hintText="Remarks for this student"
                  multiLine={true}
                  rows={2}
                  rowsMax={4}
                  fullWidth={true}
                  defaultValue={this.state.remark}
                  onChange={this.updateRemark.bind(this)}
                  onKeyDown={this.updateRemark.bind(this)} />
              </div>

              <div className="submit-action">
                <RaisedButton
                  className="primary"
                  primary={true}
                  style={{margin:5}}
                  onClick={this.clearStudent.bind(this)}
                  label="DELETE" />

              </div>
            </form>
          </div>
        </Paper>
    )
  }
}

{/* <RaisedButton
  className="primary"
  primary={true}
  style={{margin:5}}
  onClick={this.updateStudent.bind(this)}
  label="EDIT" />
<RaisedButton
  className="secondary"
  secondary={true}
  style={{margin:5}}
  onClick={this.saveStudent.bind(this)}
  label="SAVE" />
<RaisedButton
  className="secondary"
  secondary={true}
  style={{margin:5}}
  onClick={this.saveStudentAndNext.bind(this)}
  label="SAVE & NEXT" /> */}

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
