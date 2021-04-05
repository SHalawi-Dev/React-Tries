import React, { Component } from 'react'

import Menu from './MenuComponent'
import DishDetail from './DishdetailComponent'
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import Home from './HomeComponent'
import Contact from './ContactComponent'
import About from './AboutComponent'

import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addComment, fetchDishes } from '../redux/ActionCreators'
import { actions } from 'react-redux-form'

const mapStateToProps = (state) => {
  console.log(state)
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  }
}

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) =>
    dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {
    dispatch(fetchDishes())
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset('feedback'))
  },
})

class Main extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchDishes()
  }
  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId })
  }

  render() {
    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          comments={this.props.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          addComment={this.props.addComment}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
        />
      )
    }
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      )
    }
    const AboutPage = () => {
      return <About leaders={this.props.leaders}></About>
    }

    return (
      <div>
        <Header></Header>
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route
            exact
            path='/contactus'
            component={() => (
              <Contact resetFeedbackForm={this.props.resetFeedbackForm} />
            )}
          />
          <Route exact path='/aboutus' component={AboutPage} />
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route
            exact
            path='/menu'
            component={() => <Menu dishes={this.props.dishes} />}
          />
          <Redirect to='/home' />
        </Switch>
        <Footer></Footer>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))
