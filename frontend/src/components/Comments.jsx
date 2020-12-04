import React, { Component } from 'react';
import NewComment from './NewComment'

import axios from 'axios';


/* Component containing all posts */
class Comments extends Component {
	constructor(props) {
    super(props)
		this.state = {
            comments: false
        };

        this.fetchComments = this.fetchComments.bind(this);
        this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    await this.fetchComments(this.props.courseId, this.props.postId)
  }

  async handleChange(postId, courseId){
    await this.fetchComments(courseId, postId)
  }

  fetchComments = async (courseId, postId) => {
    const url = 'http://localhost:5001/webapp-17d6b/us-central1/api/comments/all-comments/'

    let {
      data: comments
    } = await axios(url, {
      params: {
        'courseId': courseId,
        'postId': postId
      }
    });
    this.setState({ comments });
  };


	render() {
    let { selectedCourse } = this.props;
    var items;
    if (this.state.comments) {
      items = this.state.comments.map((comment, i) => (
          <li key={i.toString()}>
            <hr/>
            <div><strong>{comment.author}:</strong> {comment.content}</div>
          </li>
        ))
        items.reverse()
  }

    // TODO: filter based on selected tab
		return(
			<div className="CommentsContainer">
        {this.state.comments.length === 0
          ? <p><small>No Comments yet. Create one?</small></p>
          : <>
            <ul class="comment">{items}</ul>
            </>
        }
        <div><NewComment handler={this.handleChange} courseId={this.props.courseId} userId={this.props.userId} postId={this.props.postId}/></div>
			</div>
		)
	}

}

export default Comments;