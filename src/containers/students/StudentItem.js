import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import StudentPage, { studentShape } from './StudentPage'
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
    console.log(this.props)

    return (
      <Paper className="StudentItem" style={style} zDepth={2}>
        <header>
          <Link to={`/batches/${batchId}/students/${_id}`}>
            <MenuItem primaryText={ name }/>
          </Link>
        </header>
        <main>
          { photo && <img src={ photo } alt="photo"/> }
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
