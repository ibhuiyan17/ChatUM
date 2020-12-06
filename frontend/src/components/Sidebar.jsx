import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import JoinDropdown from './JoinDropdown';
import Subscribe from './Subscribe';

import Button from 'react-bootstrap/Button';

import axios from 'axios';

class Sidebar extends Component {
	constructor(props) {
    super(props);

    this.state = {
      // selectedCourse: 'EECS493',
      courses: []
    }

    this.handleClick = this.handleClick.bind(this)
    this.refresh = this.refresh.bind(this);
  }

  async componentDidMount() {
	  this.refresh()
  }

  handleClick = (courseId) => {
    // console.log('sidebar clicked for', courseId);
    console.log('clicked', courseId)
    if (courseId !== this.props.selectedCourse) {
      this.props.updateCourseHandler(courseId);
    }
  };

  async refresh() {
    const url = process.env.REACT_APP_BASE_URL + '/api/courses/subscribed-courses/'

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

	render() {
    let { selectedCourse } = this.props;

		return(
			<div className='sidebar'>
        <Button onClick={ e => this.handleClick('') }>Popular Posts</Button>
        <hr/>
        <JoinDropdown />
        <Subscribe userId={this.props.userId} parentHandler={this.refresh} />
        {this.state.courses.length === 0
          ? <p>You aren't subscribed to any courses</p>
          : <>
              <Nav defaultActiveKey="/home" className="flex-column">
                {this.state.courses.map(course =>
                  <Nav.Link key={ course.id }
                    onClick={ e => this.handleClick(course.id) }
                >{course.id == selectedCourse && <strong>{course.name}</strong>}
                 {course.id !== selectedCourse && course.name}
                </Nav.Link>
                )}
              </Nav>
            </>
        }
        <div style={{marginLeft: "75px", position:"fixed", bottom: "10px"}}>
        <Button onClick={()=>{window.location.reload()}}>Sign Out</Button>
        </div>
			</div>
		)
	}

}

export default Sidebar;