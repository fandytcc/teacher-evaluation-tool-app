// src/App.js
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Navigation from './components/UI/Navigation'
import Routes from './routes'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import createMuiTheme from './styles/theme'

class App extends Component {
  static childContextTypes = {
    createMuiTheme: PropTypes.object.isRequired,
  }

  getChildContext() {
    return { createMuiTheme }
  }

  render() {
    return (
      <MuiThemeProvider theme={createMuiTheme}>
        <div className="App">
          <Navigation />
          <Routes />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
