import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createStudent } from '../../actions/batches/create'
//material-ui
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import '../batches/BatchPage.css'

class StudentEditor extends PureComponent {
  constructor(props) {
    super()

    const { name, photo } = props

    this.state = {
      name,
      photo
    }
  }

  updateName(event) {
    this.setState({
      name: event.target.value
    })
  }

  updatePhoto(event) {
    this.setState({
      photo: event.target.value
    })
  }

  saveStudent() {
    const student = { ...this.state }
    this.props.createStudent(this.props.batchId, student)
  }

  render() {
    return (
      <div className="student-editor">
        <Typography variant="headline">Create New Student</Typography>
        <form onSubmit={this.saveStudent.bind(this)}>
          <div className="form">
            <TextField
              type="text"
              id="name"
              className="text-field"
              label="Student's full name"
              defaultValue={this.state.name}
              onChange={this.updateName.bind(this)}
              onKeyDown={this.updateName.bind(this)}
              margin="normal" />
          </div>

          <div className="form">
            <TextField
              type="URL"
              id="photo"
              className="text-field"
              label="Student Photo URL"
              defaultValue={this.state.photo}
              onChange={this.updatePhoto.bind(this)}
              onKeyDown={this.updatePhoto.bind(this)}
              margin="normal" />
          </div>

          <div className="actions">
            <Button
              variant="raised"
              className="primary"
              color="primary"
              onClick={this.saveStudent.bind(this)}>Create Student</Button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = { createStudent }

export default connect(null, mapDispatchToProps)(StudentEditor)
