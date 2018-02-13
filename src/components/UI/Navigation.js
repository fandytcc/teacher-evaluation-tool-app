// src/components/ui/Navigation.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import signOut from '../../actions/user/sign-out'
//material-ui
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import ActionHome from 'material-ui-icons/Home'
import './Navigation.css'

const TITLE = 'Student Evaluations'

class Navigation extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool.isRequired,
    push: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }

  signOut = (event) => {
    event.preventDefault()
    this.props.signOut()
  }

  signUp = () => {
    this.props.push('/sign-up')
  }

  goHome = () => {
    this.props.push('/')
  }

  render() {
    const { signedIn } = this.props
    return (
      <div className="navbar">
        <AppBar position="static">
          <Toolbar>
            <IconButton className="icon-button" color="inherit" aria-label="go-home" onClick={this.goHome}>
              <ActionHome />
            </IconButton>
            <Typography variant="title" color="inherit" className="title" >
              {TITLE}
            </Typography>
            { signedIn ?
              <Button color="inherit" style={{position: "absolute", top: 10, right: 0 }} onClick={this.signOut.bind(this)}>Sign Out</Button> : <Button color="inherit" style={{position: "absolute", top: 10, right: 0 }} onClick={this.signUp}>Sign Up</Button> }
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: (!!currentUser && !!currentUser._id)
})

export default connect(mapStateToProps, { push, signOut })(Navigation)
