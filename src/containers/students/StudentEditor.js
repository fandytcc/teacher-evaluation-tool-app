import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createStudent } from '../../actions/batches/create'
import Title from '../../components/UI/Title'
//material-ui
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

const style = {
  height: 300,
  width: 350,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  position: 'relative',
  bottom: 320,
  right: 420,
  float: 'right',
  verticalAlign: 'top',
};

class StudentEditor extends PureComponent {
  constructor(props) {
    super()

    const { name, photo } = props

    this.state = {
      name,
      photo,
    }
  }

  updateName(event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      this.refs.summary.medium.elements[0].focus()
    }
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
      <Paper className="editor" style={style} zDepth={2}>
        <Title content="Create New Student: " />

        <form onSubmit={this.saveStudent.bind(this)} style={{ paddingLeft: 30 }}>
          <div className="form">
            <TextField
              type="text"
              id="name"
              className="name"
              label="Fill in FULL name of a student"
              defaultValue={this.state.name}
              onChange={this.updateName.bind(this)}
              onKeyDown={this.updateName.bind(this)} />
          </div>

          <div className="form">
            <TextField
              type="URL"
              id="photo"
              className="photo"
              label="Student Photo URL"
              defaultValue={this.state.photo}
              onChange={this.updatePhoto.bind(this)}
              onKeyDown={this.updatePhoto.bind(this)} />
          </div>

          <div className="actions">
            <Button
              className="primary"
              color="primary"
              onClick={this.saveStudent.bind(this)}>Create Student</Button>
          </div>

        </form>
      </Paper>
    )
  }
}

// export default StudentEditor
//
const mapDispatchToProps = { createStudent }

export default connect(null, mapDispatchToProps)(StudentEditor)
