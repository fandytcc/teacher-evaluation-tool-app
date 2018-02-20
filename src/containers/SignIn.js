import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { replace, push } from 'react-router-redux'
import signIn from '../actions/user/sign-in'
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

const buttonStyle = {
  float: 'right',
  marginLeft: '2rem',
}

export class SignIn extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
    signedIn: PropTypes.bool,
  }

  constructor() {
    super()
    this.state = { email: "", password: "" }
  }

  componentWillMount() {
    const { replace, signedIn } = this.props
    if (signedIn) replace('/')
  }

  updateEmail(event) {
    this.setState({
      email: event.target.value
    })
  }

  updatePassword(event) {
    this.setState({
      password: event.target.value
    })
  }

  submitForm(event) {
    event.preventDefault()
    const user = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.signIn(user)
  }

  signUp() {
    this.props.push('/sign-up')
  }

  render() {
    return (
      <Paper style={ dialogStyle }>
        <Title content="Sign In" level={2} />

        <form onSubmit={this.submitForm.bind(this)}>
          <div className="input">
            <TextField
              id="email"
              label="Email address"
              type="email"
              margin="normal"
              onChange={this.updateEmail.bind(this)} />
          </div>
          <div className="input">
            <TextField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              margin="normal"
              onChange={this.updatePassword.bind(this)}/>
          </div>
        </form>
        <Button color="primary" onClick={ this.signUp.bind(this) }>
          Sign Up
        </Button>
        <Button variant="raised" color="primary" onClick={ this.submitForm.bind(this) }>
          Sign In
        </Button>
      </Paper>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { signIn, replace, push })(SignIn)
