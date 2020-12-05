import React, { Component } from 'react';

import Comments from './Comments'
import Likes from './Likes'
import axios from 'axios';


/* Component containing all posts */
class Post extends Component {
	constructor(props) {
		super(props)
		this.state = {

		};
  }

	render() {
    let { postId, author, title, content, likes, courseId, userId } = this.props;

    return(
		  <div className="post">
        <h3 className="title">{title}</h3>
        <p className="content">{content}</p>
        <p className="author"><small>posted by: {author}</small></p>
        <Comments postId={postId} courseId={courseId} userId={userId}/>
        <Likes likes={likes} userId={userId} courseId={courseId} postId={postId}
        handler={this.props.handler}/>
      </div>
		)
	}

}

export default Post;