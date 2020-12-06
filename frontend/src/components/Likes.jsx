import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

import axios from 'axios';


/* Component containing all posts */
class Likes extends Component {
	constructor(props) {
    super(props)
		this.state = {

        };
        this.toggleLikes = this.toggleLikes.bind(this)
  }





  toggleLikes = async () => {
    const url = 'http://localhost:5001/webapp-17d6b/us-central1/api/posts/toggle-like/'

    await axios.post(url, {
        'courseId': this.props.courseId,
        'postId': this.props.postId,
    },
    {
      params: {
        'userId': this.props.userId
      }
    });
    this.props.handler(this.props.courseId)
  };


	render() {
        console.log(this.props)
		return(
          <div>
            <p>{this.props.likes.length} {this.props.likes.length === 1 ? "Like" : "Likes"}</p>
            <Button onClick={this.toggleLikes}>{this.props.likes.includes(this.props.userId) ? "Unlike" : "Like"}</Button>
          </div>
		)
	}

}

export default Likes;