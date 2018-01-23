// // src/recipes/RecipesContainer.js
// import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import Title from '../components/Title'
// import RecipeItem, { recipeShape } from './RecipeItem'
// import { fetchRecipes } from '../actions/recipes'
// import RecipeEditor from './RecipeEditor'
// import './RecipesContainer.css'
//
// class RecipesContainer extends PureComponent {
//   static propTypes = {
//     recipes: PropTypes.arrayOf(recipeShape).isRequired,
//   }
//
//   componentWillMount() {
//     //this.props.dispatch(fetchRecipes())
//     this.props.fetch() // see mapDispatchToProps below
//   }
//
//   renderRecipe = (recipe, index) => {
//     return <RecipeItem key={index} { ...recipe } />
//   }
//
//   render() {
//     return (
//       <div className="recipes wrapper">
//         <RecipeEditor />
//
//         <header>
//           <Title content="All Recipes" />
//         </header>
//
//         <main>
//           {this.props.recipes.map(this.renderRecipe)}
//         </main>
//       </div>
//     )
//   }
// }
//
// const mapStateToProps = ({ recipes }) => ({ recipes })
// const mapDispatchToProps = { fetch: fetchRecipes }
//
// // Same as:
// // const mapStoreToProps = (store) => {
// //   return { recipes: store.recipes }
// // }
//
// export default connect(mapStateToProps, mapDispatchToProps)(RecipesContainer)
