import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import JoinDropdown from './JoinDropdown';

import axios from 'axios';

class Sidebar extends Component {
	constructor(props) {
    super(props);

    this.state = {
      // selectedCourse: 'EECS493',
      courses: []
    }

    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
	  const url = 'http://localhost:5001/webapp-17d6b/us-central1/api/courses/subscribed-courses/'

    const {
      data: courses
    } = await axios.get(url, {
      params: {
        'userId': this.props.userId
      }
    });
    console.log('subscribed', courses)

    this.setState({ courses }, () => console.log('fetched my courses:', this.state.courses));
  }

  handleClick = (courseId) => {
    // console.log('sidebar clicked for', courseId);
    console.log('clicked', courseId)
    if (courseId !== this.props.selectedCourse) {
      this.props.updateCourseHandler(courseId);
    }
  };

	render() {
    let { selectedCourse } = this.props;

		return(
			<div className='sidebar'>
        <JoinDropdown />
        {this.state.courses.length === 0
          ? <p>You aren't subscribed to any courses</p>
          : <>
              <p><b>current: </b>{ selectedCourse === '' ? 'None' : selectedCourse }</p>
              <Nav defaultActiveKey="/home" className="flex-column">
                {this.state.courses.map(course =>
                  <Nav.Link key={ course.id }
                    onClick={ e => this.handleClick(course.id) }
                  >{course.name}</Nav.Link>
                )}
              </Nav>
            </>
        }
			</div>
		)
	}

}

export default Sidebar;