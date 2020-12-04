import React, { Component } from 'react';

import Comments from './Comments'
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
        <h3 className="title">Title: {title}</h3>
        <p className="author">Author: {author}</p>
        <p className="content">{content}</p>
        <Comments postId={postId} courseId={courseId} userId={userId}/>
      </div>
		)
	}

}

export default Post;