import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Title from '../../components/UI/Title'
// import { fetchOneStudent } from '../../actions/batches/fetch'
// import { updateStudent, clearStudent } from '../../actions/batches/update'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import './StudentItem.css'

export const studentShape = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequied,
    evaluations: PropTypes.array,
})

export class StudentPage extends PureComponent {
  static propTypes = {
    ...studentShape.isRequired,
  }

  // componentWillMount() {
  //   fetchBatches()
  //   this.props.fetchOneStudent(this.props.match.params.studentId)
  // }

  updateCode(event) {
    this.props.onChange()
  }

  updateRemark(event) {
    this.setState({
      remark: event.target.value
    })
  }

  updateEvaluatedAt(event) {
    const { evaluatedAt } = this.state

    this.setState({
      evaluatedAt: this.refs.evaluatedAt.value
    })
  }

  saveStudent() {
    const { batchId, studentId } = this.props.params
    const { code, remark, evaluatedAt } = this.state
    const student = {
      ...this.state,
      id: studentId,
     }
    this.props.updateStudent(student)
    this.props.push(`/batches/${batchId}`)
  }

  updateStudent(event, evaluation) {
    this.setState({
      evaluatedAt: Date.now,
      remark: evaluation.remark
    })
  }

  clearStudent(event, student) {
    this.props.clearStudent(student)
  }

  saveStudentAndNext() {
    const student = { ...this.state }
    this.props.updateStudent(student)
    this.props.push('/batches/:batchId/students/:studentId')
  }

  renderEvaluations(evaluation, index) {
    const { evaluations } = this.props
    const colorCode = evaluation.code

    return (
      <RaisedButton
        key={index}
        className="evaluation-code"
        backgroundColor={colorCode}
        onClick={this.updateStudent(evaluation).bind(this)} />
    )
  }

  render() {
    const { _id, name, photo, evaluations, title  } = this.props
    // const { studentId } = this.props.params
    if (!_id) return null

    const allColorCodes = evaluations.map(evaluation => evaluation.code)

    return(
      <main>
        <Paper>
          <div className="student-details">
            <p>Student name: { name }</p>
            <p>{ photo && <img src={ photo } alt="Student Images"/> }</p>
            <p>Batch no: {title}</p>
            <p>All Evaluations: { allColorCodes }</p>
            <div>
              { evaluations.map(this.renderEvaluations.bind(this)) }
            </div>
          </div>

          <div className="evaluation-form">
            <h3>Daily Evaluation</h3>
            <form onSubmit={this.saveStudent.bind(this)}>
              <div className="form">
                <DatePicker
                  hintText="Evaluation date"
                  ref="evaluatedAt"
                  className="evaluationDate"
                  autoOk={true}
                  defaultValue={this.state.evaluatedAt}          onChange={this.updateEvaluatedAt.bind(this)}
                  onKeyDown={this.updateEvaluatedAt.bind(this)} />
                <TextField
                  type="text"
                  ref="remark"
                  className="remark"
                  hintText="Remarks for this student"
                  multiLine={true}
                  fullWidth={true}
                  defaultValue={this.state.remark}
                  onChange={this.updateRemark.bind(this)}
                  onKeyDown={this.updateRemark.bind(this)} />
              </div>

              <div className="color-codes">
                <RaisedButton
                  className="red"
                  backgroundColor="#f24232"
                  onClick={this.updateCode.bind(this)}
                  label="Red"/>
                <RaisedButton
                  className="yellow"
                  backgroundColor="#f1f495"
                  onClick={this.updateCode.bind(this)}
                  label="Yellow"/>
                <RaisedButton
                  className="green"
                  backgroundColor="#9ed1a7"
                  onClick={this.updateCode.bind(this)}
                  label="Green"/>
              </div>
            </form>
          </div>

          <div className="submit-action">
            <RaisedButton
              className="secondary"
              secondary={true}
              onClick={this.clearStudent.bind(this)}
              label="DELETE" />
            <RaisedButton
              className="primary"
              primary={true}
              onClick={this.updateStudent.bind(this)}
              label="EDIT" />
            <RaisedButton
              className="primary"
              primary={true}
              onClick={this.saveStudent.bind(this)}
              label="SAVE" />
            <RaisedButton
              className="primary"
              primary={true}
              onClick={this.saveStudent.bind(this)}
              label="SAVE & NEXT" />
          </div>
        </Paper>
      </main>
    )
  }
}

const mapStateToProps = ({ batches }, { match }, { push }) => {
  const batch = batches.filter((b) => (b._id === match.params.batchId))[0]
  // const currentStudent = batch && batch.students.filter((s) => s._id )[0]

  const student = batch.students.reduce((prev, next) => {
    if (next.student._id === match.params.studentId) {
      return next
    }
    return prev
  }, {})

  return {
    ...student
  }
}

export default StudentPage
// export default connect(mapStateToProps, {
// fetchOneStudent,
// updateStudent,
// clearStudent,
// })(StudentPage)
