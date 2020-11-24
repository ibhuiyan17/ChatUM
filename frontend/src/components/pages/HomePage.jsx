import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

import Sidebar from '../Sidebar'
import Posts from '../Posts'

class HomePage extends Component {
	constructor(props) {
		super(props)

		this.state = {
      selectedCourse: ''
    };
    
    this.updateSelectedCourse = this.updateSelectedCourse.bind(this);
  }
  
  updateSelectedCourse(courseId) {
    this.setState({ selectedCourse: courseId }, () => console.log('course updated to', courseId));
  }


	render() {
    let { userId } = this.props;
    let { selectedCourse } = this.state;

		return(
			<>
        <Sidebar
          userId={ userId }
          selectedCourse={ selectedCourse }
          updateCourseHandler={ this.updateSelectedCourse }
        />
        <p>userId={userId}</p>
        <Posts
          selectedCourse={ selectedCourse }
        />
			</>
		)
	}

}

export default HomePage;