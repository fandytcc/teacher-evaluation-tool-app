import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createBatch } from '../../actions/batches/create'
import Title from '../../components/UI/Title'
//material-ui & styling
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

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

  updateStartDate(event, date) {
    this.setState({
      startDate: date
    })
  }

  updateEndDate(event, date) {
    this.setState({
      endDate: date
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
            <TextField
              id="startDate"
              label="Start date"
              type="startDate"
              className="startDate"
              defaultValue={this.state.startDate}            onChange={this.updateStartDate.bind(this)}
              onKeyDown={this.updateStartDate.bind(this)} />
          </div>

          <div className="form">
            <TextField
              id="endDate"
              label="End date"
              type="endDate"
              className="endDate"
              defaultValue={this.state.endDate}            onChange={this.updateEndDate.bind(this)}
              onKeyDown={this.updateEndDate.bind(this)} />
          </div>

          <div className="actions">
            <Button
              varient="raised"
              className="primary"
              color="primary"
              onClick={this.saveBatch.bind(this)}> Create Batch </Button>
          </div>

        </form>
      </Paper>
    )
  }
}

const mapDispatchToProps = { createBatch }

export default connect(null, mapDispatchToProps)(BatchEditor)
