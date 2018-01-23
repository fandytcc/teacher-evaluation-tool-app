import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createBatch } from '../../actions/batches/create'
import Title from '../../components/UI/Title'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
// import './BatchEditor.css'

const style = {
  height: 320,
  width: 350,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

class BatchEditor extends PureComponent {
  constructor(props) {
    super()

    const { title, startDate, endDate } = props

    this.state = {
      title,
      startDate,
      endDate,
    }
  }

  updateTitle(event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      this.refs.summary.medium.elements[0].focus()
    }
    this.setState({
      title: event.target.value
    })
  }

  updateStartDate(event) {
    this.setState({
      startDate: this.refs.startDate.value
    })
  }

  updateEndDate(event) {
    this.setState({
      endDate: this.refs.endDate.value
    })
  }

  saveBatch() {
    const batch = { ...this.state }
    this.props.createBatch(batch)
  }

  render() {
    return (
      <Paper className="editor" style={style} zDepth={2}>
        <Title content="Create New Batch: " />

        <form onSubmit={this.saveBatch.bind(this)} style={{ paddingLeft: 30 }}>
          <div className="form">
            <TextField
              type="text"
              ref="title"
              className="title"
              hintText="Batch Number"
              defaultValue={this.state.title}
              onChange={this.updateTitle.bind(this)}
              onKeyDown={this.updateTitle.bind(this)} />
          </div>

          <div className="form">
            <DatePicker
              hintText="Start date"
              openToYearSelection={true}
              ref="startDate"
              className="startDate"
              value={this.state.startDate}            onChange={this.updateStartDate.bind(this)}
              onKeyDown={this.updateStartDate.bind(this)} />
          </div>

          <div className="form">
            <DatePicker
              hintText="End date"
              openToYearSelection={true}
              ref="endDate"
              className="endDate"
              value={this.state.endDate}            onChange={this.updateEndDate.bind(this)}
              onKeyDown={this.updateEndDate.bind(this)} />
          </div>

          <div className="actions">
            <RaisedButton
              className="primary"
              primary={true}
              onClick={this.saveBatch.bind(this)}
              label="Create Batch"/>
          </div>

        </form>
      </Paper>
    )
  }
}

const mapDispatchToProps = { createBatch }

export default connect(null, mapDispatchToProps)(BatchEditor)
