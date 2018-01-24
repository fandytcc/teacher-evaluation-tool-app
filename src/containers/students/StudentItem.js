import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import StudentPage, { studentShape } from './StudentPage'

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

  render() {
    const { _id, name, photo, evaluations } = this.props

    return (
      <Paper className="StudentItem" style={style} zDepth={2}>
        <Menu>

            <MenuItem primaryText={ name }/>
            { photo && <img src={ photo } alt="photo"/> }

          <p>latest color: { evaluations.code }</p>
        </Menu>
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
