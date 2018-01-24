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
  height: 400,
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

  render() {
    const { _id, name, photo, evaluations } = this.props

    const allColorCode = evaluations.map(evaluation => evaluation.code)

    return (
      <Paper className="StudentItem" style={style} zDepth={2}>
        <header>
          <MenuItem primaryText={ name }/>
        </header>
        <main>
          { photo && <img src={ photo } alt="photo"/> }
        </main>
        <footer>
          <p>Latest color code
            <div className={this.classNames()}></div>
          </p>
          <p>{ allColorCode }</p>
        </footer>
      </Paper>
    )
  }
}

// const mapDispatchToProps = {
//
// }

export default StudentItem

// <Link to={`/batches/${_id}/students/${_id}`}>
//  </Link>
