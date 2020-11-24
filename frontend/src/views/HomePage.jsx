import React, { Component } from 'react';

import axios from 'axios';

import Button from 'react-bootstrap/Button'

import Sidebar from '../components/Sidebar';
import Posts from '../components/Posts';
import NewPost from '../components/NewPost';

class HomePage extends Component {
	constructor(props) {
		super(props)

		this.state = {
      selectedCourse: '',
      refreshPostsFlag: false
    };
    
    this.updateSelectedCourse = this.updateSelectedCourse.bind(this);
    this.triggerPostsRefresh = this.triggerPostsRefresh.bind(this);
    this.postsRefreshComplete = this.postsRefreshComplete.bind(this);
  }
  
  updateSelectedCourse(courseId) {
    this.setState({ selectedCourse: courseId }, () => console.log('course updated to', courseId));
  }

  // called by NewPost on submit, communicates to Posts component to refresh displayed posts
  triggerPostsRefresh() {
    this.setState({ refreshPostsFlag: true }, () => console.log('starting posts refresh'));
  }

  // called by Posts component to signal that it has triggered the refresh
  postsRefreshComplete() {
    this.setState({ refreshPostsFlag: false }, () => console.log('completed posts refresh'));
  }

	render() {
    let { userId } = this.props;
    let { selectedCourse, refreshPostsFlag } = this.state;

		return(
			<>
        <Sidebar
          userId={ userId }
          selectedCourse={ selectedCourse }
          updateCourseHandler={ this.updateSelectedCourse }
        />
        {selectedCourse !== '' 
          ? <NewPost 
              userId={ userId }
              selectedCourse={ selectedCourse }
              triggerPostsRefresh={ this.triggerPostsRefresh }
            />
          : null
        }
        <Posts
          selectedCourse={ selectedCourse }
          refreshPostsFlag={ refreshPostsFlag }
          postsRefreshComplete={ this.postsRefreshComplete } 
        />
			</>
		)
	}

}

export default HomePage;