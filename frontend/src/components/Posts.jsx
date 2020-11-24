import React, { Component } from 'react';

import axios from 'axios';


/* Component containing all posts */
class Posts extends Component {
	constructor(props) {
		super(props)

		this.state = {
      postsContent: []
      
		};
  }
  
  componentDidUpdate(prevProps) {
    let { selectedCourse } = this.props;
    if (selectedCourse !== prevProps.selectedCourse) {
      console.log('fetching posts for', selectedCourse);
      // this.fetchPosts(selectedCourse);
    }
  }


	render() {

		return(
			<>
			</>
		)
	}

}

export default Posts;