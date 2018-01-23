// src/components/ui/Title.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './Title.css'

class Title extends PureComponent {
  static propTypes = {
    content: PropTypes.string.isRequired,
    level: PropTypes.number,
  }

  classNames() {
    const { level } = this.props
    return `Batch id-${level || 1}`
  }

  render() {
    return(
      <h2 className={this.classNames()}>
        { this.props.content }
      </h2>
    )
  }
}

export default Title
