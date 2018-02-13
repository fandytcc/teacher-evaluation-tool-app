// src/containers/SignUp.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import signUp from '../actions/user/sign-up'
import Title from '../components/UI/Title'
//material-ui
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

const dialogStyle = {
  width: '400px',
  margin: '50px auto',
  padding: '2rem',
}

// const buttonStyle = {
//   float: 'right',
//   marginLeft: '2rem',
// }

export class SignUp extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      nickname: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    }
  }

  submitForm(event) {
    event.preventDefault()
    if (this.validateAll()) {
      const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }
      this.props.signUp(user)
    }
    return false
  }

  signIn() {
    this.props.push('/sign-in')
  }

  validateAll() {
    return this.validateName() &&
      this.validateEmail() &&
      this.validatePassword() &&
      this.validatePasswordConfirmation()
  }

  validateName() {
    const { name } = this.state

    if (name.length > 1) {
      this.setState({
        nameError: null
      })
      return true
    }

    this.setState({
      nameError: 'Please provide your name'
    })
    return false
  }

  validateEmail() {
    const { email } = this.state

    if (email.match(/^[a-z0-9._-]+@[a-z0-9._-]+.[a-z0-9._-]+$/)) {
      this.setState({
        emailError: null
      })
      return true
    }

    if (email === '') {
      this.setState({
        emailError: 'Please provide your email address'
      })
      return false
    }

    this.setState({
      emailError: 'Please provide a valid email address'
    })
    return false
  }

  validatePassword() {
    const { password } = this.state

    if (password.length < 6) {
      this.setState({
        passwordError: 'Password is too short'
      })
      return false
    }

    if (password.match(/[a-zA-Z]+/) && password.match(/[0-9]+/)) {
      this.setState({
        passwordError: null
      })
      return this.validatePasswordConfirmation()
    }

    this.setState({
      passwordError: 'Password should contain both letters and numbers'
    })
    return false
  }

  validatePasswordConfirmation() {
    const { password, passwordConfirmation } = this.state

    if (password === passwordConfirmation) {
      this.setState({
        passwordConfirmationError: null
      })
      return true
    }

    this.setState({
      passwordConfirmationError: 'Passwords do not match'
    })
    return false
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    }, this.validateField(name))
  }

  validateField = name => _ => {
  switch(name) {
    case 'name' :
      return this.validateName()
    case 'email' :
      return this.validateEmail()
    case 'password' :
      return this.validatePassword()
    case 'passwordConfirmation' :
      return this.validatePasswordConfirmation()
    default :
      return this.validateAll()
  }
}

  render() {
    const { name, email, password, passwordConfirmation, nameError, emailError, passwordError, passwordConfirmationError} = this.state

    return (
      <Paper style={ dialogStyle }>
        <Title content="Sign Up" level={2} />

        <form onSubmit={this.submitForm.bind(this)}>
          <div className="input">
            <TextField
              id="name"
              type="text"
              label="Your name"
              value={name}
              onChange={this.handleChange('name').bind(this)}
              errorText={!!nameError}
              margin="dense" />
          </div>
          <div className="input">
            <TextField
              id="email"
              type="email"
              label="Email address"
              value={email}
              onChange={this.handleChange('email').bind(this)}
              errorText={!!emailError}
              margin="dense" />
          </div>
          <div className="input">
            <TextField
              id="password"
              type="password"
              label="Password"
              value={password}
              onChange={this.handleChange('password').bind(this)}
              errorText={!!passwordError}
              margin="dense" />
          </div>
          <div className="input">
            <TextField
              id="passwordConfirmation"
              type="password"
              label="Repeat Password"
              value={passwordConfirmation}
              onKeyUp={this.handleChange('passwordConfirmation').bind(this)}
              onChange={this.handleChange('passwordConfirmation').bind(this)}
              errorText={!!passwordConfirmationError}
              margin="dense" />
          </div>
        </form>
        <Button color="primary"
          onClick={ this.signIn.bind(this) }>Sign In</Button>
        <Button variant="raised" color="primary"
          onClick={ this.submitForm.bind(this) }>Sign Up</Button>
      </Paper>
    )
  }
}

export default connect(null, { signUp, push })(SignUp)
