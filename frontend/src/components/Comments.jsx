import React, { Component } from 'react';
import NewComment from './NewComment'

import axios from 'axios';


/* Component containing all posts */
class Comments extends Component {
	constructor(props) {
    super(props)
		this.state = {
            comments: false,
            showComments: false
        };

        this.fetchComments = this.fetchComments.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleShowComments = this.toggleShowComments.bind(this);
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

  toggleShowComments(){
    console.log("toggled")
    this.setState({showComments: !this.state.showComments})
  }

	render() {
    let { selectedCourse } = this.props;
    var items;
    if (this.state.comments) {
      items = this.state.comments.map((comment, i) => (
          <li key={i.toString()}>
            <small>
            <hr/>
            <div><strong><i>{comment.author}:</i></strong> {comment.content}</div>
            </small>
          </li>
        ))
        items.reverse()
  }
  var text = this.state.showComments ? "Hide Comments" : "Show " +this.state.comments.length+" Comments"
    // TODO: filter based on selected tab
		return(
			<div className="CommentsContainer">
        {this.state.comments.length === 0
          ? <p><small>No Comments yet. Create one?</small></p>
          : <>
            <p onClick={this.toggleShowComments}><small>{text}</small></p>
            </>
        }
        {this.state.comments.length != 0 && this.state.showComments
        ? <ul class="comment">{items}</ul>
        : <></>
        }
        <div><NewComment handler={this.handleChange} courseId={this.props.courseId} userId={this.props.userId} postId={this.props.postId}/></div>
			</div>
		)
	}

}

export default Comments;