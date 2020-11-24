import React, { Component } from 'react';

import Post from './Post'

import axios from 'axios';


/* Component containing all posts */
class Posts extends Component {
	constructor(props) {
		super(props)

		this.state = {
      postsContent: []
    };
    
    this.fetchPosts = this.fetchPosts.bind(this);
  }
  
  componentDidUpdate(prevProps) {
    let { selectedCourse } = this.props;
    if (selectedCourse !== prevProps.selectedCourse) {
      console.log('fetching posts for', selectedCourse);
      this.fetchPosts(selectedCourse);
    }
  }

  fetchPosts = async (courseId) => {
    const url = 'http://localhost:5001/webapp-17d6b/us-central1/api/posts/all-posts/'
    
    let {
      data: postsContent
    } = await axios(url, {
      params: {
        courseId: courseId
      }
    });

    this.setState({ postsContent }, () => console.log('done retreiving posts for', courseId));
  };


	render() {
    let { selectedCourse } = this.props;

    // TODO: filter based on selected tab
		return(
			<div className="postsContainer">
        {this.state.postsContent.length === 0 && selectedCourse !== ''
          ? <h2>No posts yet for { selectedCourse }. Create one?</h2>
          : <>
              {this.state.postsContent.map( ({ id, author, title, content, likes }) =>
                <Post key={id}
                  author={author}
                  title={title}
                  content={content}
                  likes={likes}
                />
              )}
            </>
        }
        
			</div>
		)
	}

}

export default Posts;