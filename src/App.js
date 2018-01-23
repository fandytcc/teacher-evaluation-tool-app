// src/App.js
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import muiTheme from './styles/theme'
import Navigation from './components/UI/Navigation'
// import Routes from './routes'
import BatchesContainer from './containers/batches/BatchesContainer'
import BatchPage from './containers/batches/BatchPage'

class App extends Component {
  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  getChildContext() {
    return { muiTheme }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <Navigation />
          <BatchesContainer />
          <BatchPage />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App

          // <Routes />
