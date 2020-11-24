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
    let { author, title, content, likes } = this.props;
    
    return(
			<div className="post">
        <p className="title">{title}</p>
        <p className="author">{author}</p>
        <p classname="content">{content}</p>
      </div>
		)
	}

}

export default Post;