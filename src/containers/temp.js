import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
// import Title from './components/UI/Title'
// import { fetchOneStudent } from '../../actions/batches/fetch'
// import { updateStudent, clearStudent } from '../../actions/batches/update'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
// import './StudentItem.css'

const style = {
  height: 600,
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

export const evaluationShape = PropTypes.shape({
    evaluatedAt: PropTypes.string.isRequired,
    remark: PropTypes.string.isRequired,
    code: PropTypes.string.isRequied,
})

class Temp extends PureComponent {
  constructor(props) {
    super()

    const { evaluatedAt, remark, code } = props

    this.state = {
      evaluatedAt,
      remark,
      code
    }
  }

  static propTypes = {
    ...studentShape.isRequired,
    ...evaluationShape.isRequired,
  }

  // componentWillMount() {
  //   fetchBatches()
  //   this.props.fetchOneStudent(this.props.match.params.studentId)
  // }

  updateEvaluatedAt(event) {
    this.setState({
      evaluatedAt: this.refs.evaluatedAt.value
    })
  }

  updateRemark(event) {
    this.setState({
      remark: event.target.value
    })
  }

  clearStudent(event, student) {
    this.props.clearStudent(student)
  }

  updateStudent(event, evaluation) {
    this.setState({
      evaluatedAt: Date.now,
      remark: evaluation.remark
    })
  }

  saveStudent() {
    const { batchId, studentId } = this.props.match.params
    const { code, remark, evaluatedAt } = this.state
    const student = {
      ...this.state,
      id: studentId,
     }
    this.props.updateStudent(student)
    this.props.push(`/batches/${batchId}`)
  }

  saveStudentAndNext() {
    const { batchId, studentId } = this.props.match.params
    const { code, remark, evaluatedAt } = this.state
    const student = { ...this.state }
    this.props.updateStudent(student)
    this.props.push(`/batches/${batchId}/students/${studentId}`)
  }

  renderEvaluations(evaluation, index) {
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
    return(
        <Paper className="Result" style={style} zDepth={2}>
          <div className="student-details">
            <h3>Student name:</h3>
            <div>
               photo url
            </div>
            <h3>Batch no: </h3>
            <h3>All Evaluations:</h3>
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
                <RaisedButton
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
                  label="SAVE & NEXT" />
              </div>
            </form>
          </div>
        </Paper>
    )
  }
}

export default Temp
