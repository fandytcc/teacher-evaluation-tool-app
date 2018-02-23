import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import StudentPage, { studentShape } from './StudentPage'
//material-ui & styling
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import './StudentItem.css'

//styling paper
// const style = {
//   paddingTop: 16,
//   paddngBottom: 16,
//   paddingLeft: 40,
//   height: 300,
//   width: 250,
//   margin: 20,
//   textAlign: 'left',
//   display: 'inline-block',
// }

const cardStyles = {
  card: {
    width: 250,
    margin: 20,
    display: 'inline-block',
  },
  media: {
    height: 200,
  },
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
    const { _id, name, photo, batchId } = this.props

    return (
      <Card className="StudentItem" style={cardStyles.card}>
        <Link to={`/batches/${batchId}/students/${_id}`}>
          { photo && <CardMedia style={cardStyles.media} image={ photo } title="student"/> }
        </Link>
        <CardContent>
          <Link to={`/batches/${batchId}/students/${_id}`}>
            <Typography variant="title">
              { name }
            </Typography>
          </Link>
        </CardContent>
        <CardActions>
          <div className={this.classNames()}></div>
          <p>Latest evaluation</p>
        </CardActions>
      </Card>
    )
  }
}

export default StudentItem
