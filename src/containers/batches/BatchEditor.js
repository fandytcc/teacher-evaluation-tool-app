import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createBatch } from '../../actions/batches/create'
import Title from '../../components/UI/Title'
//material-ui & styling
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import './BatchEditor.css'

const style = {
  height: 350,
  width: 350,
  margin: 10,
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
      <Paper className="editor" style={style} elevation={2}>
        <Title content="Create New Batch: " />

        <form onSubmit={this.saveBatch.bind(this)} className="container">
          <div className="form" style={{margin: 20}}>
            <TextField
              id="title"
              className="text-field"
              label="Batch Number"
              value={this.state.title}
              onChange={this.updateTitle.bind(this)}
              margin="dense"
              autoFocus
              fullWidth />

            <TextField
              id="startDate"
              label="Start date"
              type="date"
              className="text-field"
              defaultValue={this.state.startDate}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.updateStartDate.bind(this)}
              onKeyDown={this.updateStartDate.bind(this)}
              margin="dense"
              autoFocus
              fullWidth />

            <TextField
              id="endDate"
              label="End date"
              type="date"
              className="text-field"
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={this.state.endDate}            onChange={this.updateEndDate.bind(this)}
              onKeyDown={this.updateEndDate.bind(this)}
              margin="dense"
              autoFocus
              fullWidth />
          </div>

          <div className="actions" style={{margin: 10}}>
            <Button
              variant="raised"
              className="primary"
              color="primary"
              onClick={this.saveBatch.bind(this)}>
            Create Batch
            </Button>
          </div>

        </form>
      </Paper>
    )
  }
}

const mapDispatchToProps = { createBatch }

export default connect(null, mapDispatchToProps)(BatchEditor)
