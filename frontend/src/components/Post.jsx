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
        <h1 className="title">{title}</h1>
        <p className="author"><small>Posted by: {author}</small></p>
        <p className="content">{content}</p>
        <br></br>
        <Likes likes={likes} userId={userId} courseId={courseId} postId={postId}
        handler={this.props.handler}/>
        <hr></hr>
        <Comments postId={postId} courseId={courseId} userId={userId}/>
        
      </div>
		)
	}

}

export default Post;