import React, { Component } from 'react';

import axios from 'axios';


/* Component containing all posts */
class Post extends Component {
	constructor(props) {
		super(props)

		this.state = {
      
		};
  }
  
	render() {
    let { postId, author, title, content, likes } = this.props;
    
    return(
		  <div className="post">
        <p className="title">{title}</p>
        <p className="author">{author}</p>
        <p className="content">{content}</p>
        <p>postId: {postId}</p>
      </div>
		)
	}

}

export default Post;