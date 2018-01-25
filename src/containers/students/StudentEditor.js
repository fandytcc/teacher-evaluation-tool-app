import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createStudent } from '../../actions/batches/create'
import Title from '../../components/UI/Title'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

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
      startDate: this.refs.photo.value
    })
  }

  saveStudent() {
    const student = { ...this.state }
    this.props.createStudent(student)
  }

  render() {
    return (
      <Paper className="editor" style={style} zDepth={2}>
        <Title content="Create New Student: " />

        <form onSubmit={this.saveStudent.bind(this)} style={{ paddingLeft: 30 }}>
          <div className="form">
            <TextField
              type="text"
              ref="name"
              className="name"
              hintText="Fill in FULL name of a student"
              defaultValue={this.state.name}
              onChange={this.updateName.bind(this)}
              onKeyDown={this.updateName.bind(this)} />
          </div>

          <div className="form">
            <TextField
              type="URL"
              ref="photo"
              className="photo"
              hintText="Student Photo URL"
              errorText="This field is required"
              defaultValue={this.state.photo}
              onChange={this.updatePhoto.bind(this)}
              onKeyDown={this.updatePhoto.bind(this)} />
          </div>

          <div className="actions">
            <RaisedButton
              className="primary"
              primary={true}
              onClick={this.saveStudent.bind(this)}
              label="Create Student"/>
          </div>

        </form>
      </Paper>
    )
  }
}

export default StudentEditor
//
// const mapDispatchToProps = { createStudent }
//
// export default connect(null, mapDispatchToProps)(StudentEditor)
