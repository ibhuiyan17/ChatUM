import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class newComment extends Component {
	constructor(props) {
		super(props)

		this.state = {
            content: "Add your comment here",
    };
    this.submitCommentClicked = this.submitCommentClicked.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Create post in current class
  submitCommentClicked = async () => {
    let url = process.env.REACT_APP_BASE_URL + '/api/comments/create-comment/'

    let { postId, courseId, userId } = this.props;

    try {
      await axios.post(url, /* data */ {
          'postId': postId,
          'content': this.state.content,
          'courseId': courseId
        },
        { /* config (query params) */
          params: {
            'userId': userId
          }
        }
      );
      console.log('successfully created comment in', this.props);
      this.props.handler(postId, courseId)
      // alert('successfully created post'); // TODO: delete later

    } catch (err) {
      let { error: msg } = err.response.data;
      console.log(msg);
      alert(msg);
    }

  };

  handleChange(event) {
    this.setState({ content: event.target.value });
  }


	render() {

    return(
      <>
        <input
            class="form-control"
            type="text"
            id="commentInput"
            name="CommentBox"
            value={ this.state.content }
            onChange={ this.handleChange }>
        </input>
        <br/>
        <Button
          className="newCommentButton"
          onClick={ this.submitCommentClicked }
        >Submit Comment</Button>
      </>
		)
	}

}

export default newComment;