import React, { Component } from 'react'
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
} from 'reactstrap'

export default class Dishdetail extends Component {
  renderDish(dish) {
    if (dish != null) {
      return (
        <div className='col-12 col-md-5 m-1'>
          <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
      )
    } else return <div></div>
  }

  formatDate(d) {
    const date = new Date(d)
    console.log(date)
    return date.toDateString()
  }
  renderComments(comments) {
    if (comments != null)
      return (
        <div className='col-12 col-md-5 m-1'>
          <h4>Comments</h4>
          <ListGroup as='ul'>
            {comments.map((comment, index) => {
              return (
                <ListGroupItem as='li' key={index}>
                  <div>{comment.comment}</div>
                  <div>
                    -- {comment.author} , {this.formatDate(comment.date)}
                  </div>
                </ListGroupItem>
              )
            })}
          </ListGroup>
        </div>
      )
    else return <div></div>
  }

  render() {
    if (this.props.selectedDish != null) {
      return (
        <div className='row'>
          {this.renderDish(this.props.selectedDish)}
          {this.renderComments(this.props.selectedDish.comments)}
        </div>
      )
    } else {
      return <div></div>
    }
  }
}
