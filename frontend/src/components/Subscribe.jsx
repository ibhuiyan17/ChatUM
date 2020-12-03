import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import axios from 'axios';


/* Component containing all posts */
class Subscribe extends Component {
	constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            courses: false,
        }
        this.submitSubscribeClicked = this.submitSubscribeClicked.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    async componentDidMount(){
        const url = "http://localhost:5001/webapp-17d6b/us-central1/api/courses/all-courses"

        const {
            data: courses
          } = await axios.get(url);

        this.setState({
            courses: courses
        })
    }

  // Create post in current class
  submitSubscribeClicked = async (courseid) => {
    console.log('submitting post');

    let url = 'http://localhost:5001/webapp-17d6b/us-central1/api/courses/subscribe-course'
    let { userId } = this.props;

    try {
      await axios.post(url, /* data */ {
          'courseId': courseid
        },
        { /* config (query params) */
          params: {
            'userId': this.props.userId
          }
        }
      );
      console.log('successfully subscribed', courseid);
      // alert('successfully created post'); // TODO: delete later

    } catch (err) {
      let { error: msg } = err.response.data;
      console.log(msg);
      alert(msg);
    }

    this.hideModal();
    this.props.parentHandler();
  };

  showModal = () => {
    // e.preventDefault();
    this.setState({
      showModal: true
    }, () => console.log('displaying new post modal'));
  };

  hideModal = () => {
    this.setState({
      showModal: false,
      postTitle: '',
      postContent: ''
    }, () => console.log('hiding new post modal'));
  };

	render() {

    var items = null
    if (this.state.courses) {
        items = this.state.courses.map((course, i) => (
            <li key={i.toString()}>
              <div>{course.id}  {course.name}</div><br/>
              <div><button onClick={() => {this.submitSubscribeClicked(course.id)}} class="btn-success">Subscribe</button></div>
              <div><hr/></div>
            </li>
          ))
    }
    return(
        <div>
        <Button
          className="subscribeButton"
          onClick={ this.showModal }
        >Subscribe to Courses</Button>
        <Modal show={ this.state.showModal } onHide={ this.hideModal }>
          <Modal.Header closeButton>
            <Modal.Title>Subscribe to a course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div>
                  {
                      this.state.courses ?
                      <ul>{items}</ul>
                      : <p>Not loaded</p>
                  }
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={ this.hideModal }>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
		)
	}

}

export default Subscribe;