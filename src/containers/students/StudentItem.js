import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import StudentPage, { studentShape } from './StudentPage'
//material-ui & styling
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import './StudentItem.css'

const style = {
  height: 450,
  width: 300,
  margin: 20,
  textAlign: 'left',
  display: 'inline-block',
}

class StudentItem extends PureComponent {
  static propTypes = {
    ...studentShape.isRequired,
  }

  classNames() {
    const { evaluations } = this.props
    const lastEvaluation = evaluations[evaluations.length-1]
    const lastColorCode = lastEvaluation.code

    return `block ${lastColorCode}`
  }

  renderAllColorCodes(){
    const { evaluations } = this.props
    console.log(evaluations.length)
    return evaluations.map(evaluation => `block ${evaluation.code}`)
  }

  render() {
    const { _id, name, photo, batchId } = this.props

    return (
      <Paper className="StudentItem" style={style} zDepth={2}>
        <header>
          <Link to={`/batches/${batchId}/students/${_id}`}>
            <Typography>{ name }</Typography>
          </Link>
        </header>
        <main>
          { photo && <img src={ photo } alt="student"/> }
        </main>
        <footer>
          <p>Latest evaluation:
            <div className={this.classNames()}></div>
          </p>
        </footer>
      </Paper>
    )
  }
}

export default StudentItem
