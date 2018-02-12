import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import BatchesContainer from './containers/batches/BatchesContainer'
import BatchPage from './containers/batches/BatchPage'
import StudentPage from './containers/students/StudentPage'
import StudentResult from './containers/students/StudentResult'
import { SignIn, SignUp, temp } from './containers'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={BatchesContainer} />
        <Route exact path="/batches/:batchId" component={BatchPage} />
        <Route path="/batches/:batchId/students/:studentId" component={StudentPage} />
        <Route path="/temp" component={temp} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
      </div>
    )
  }
}
