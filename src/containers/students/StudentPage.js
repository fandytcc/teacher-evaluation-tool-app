import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './StudentItem.css'
// import StudentEvaluation, { evaluationShape } from './StudentEvaluation'

// import { fetchRecipeById } from '../actions/recipes'

export const studentShape = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequed,
    evaluations: PropTypes.array,
})

export class StudentPage extends PureComponent {
  static propTypes = {
    ...studentShape.isRequired,
  }

  // componentWillMount() {
  //   this.props.fetchRecipeById(this.props.match.params.recipeId)
  // }
  render() {
    const { _id, name, photo, evaluations } = this.props
    if (!_id) return null

    const allColorCode = evaluations.map(evaluation => evaluation.code)

    return(
      <main>
        <div className="student-page">
          <p>{ name }</p>
          <p>{ photo && <img src={ photo } alt="Student Images"/> }</p>
          <p>{ allColorCode }</p>
        </div>
        <div className="evaluation">
         <p>student evaluation form</p>
        </div>
      </main>
    )
  }
}

// const mapStateToProps = ({ recipes }, { match }) => {
//   const recipe = recipes.reduce((prev, next) => {
//     if (next._id === match.params.recipeId) {
//       return next
//     }
//     return prev
//   }, {})
//
//   return {
//     ...recipe
//   }
// }

export default StudentPage
// export default connect(mapStateToProps, { fetchRecipeById })(RecipePage)
