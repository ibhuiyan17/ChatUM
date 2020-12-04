import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import axios from 'axios';


/* Component containing all posts */
class NewPost extends Component {
	constructor(props) {
		super(props)

		this.state = {
      showModal: false,
      postTitle: '',
      postContent: ''
    };

    this.submitPostClicked = this.submitPostClicked.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  // Create post in current class
  submitPostClicked = async () => {
    console.log('submitting post');

    let url = 'http://localhost:5001/webapp-17d6b/us-central1/api/posts/create-post/'
    let { postTitle, postContent } = this.state;
    let { userId, selectedCourse, triggerPostsRefresh } = this.props;

    try {
      await axios.post(url, /* data */ {
          'title': postTitle,
          'content': postContent,
          'type': 'main', // TODO: change later to bind to tabs
          'courseId': selectedCourse
        },
        { /* config (query params) */
          params: {
            'userId': userId
          }
        }
      );
      console.log('successfully created post in', selectedCourse);
      // alert('successfully created post'); // TODO: delete later

    } catch (err) {
      let { error: msg } = err.response.data;
      console.log(msg);
      alert(msg);
    }

    triggerPostsRefresh();
    this.hideModal();
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
    let { selectedCourse } = this.props;

    return(
      <>
        <Button
          className="newPostButton"
          onClick={ this.showModal }
        >New Post</Button>

        <Modal show={ this.state.showModal } onHide={ this.hideModal }>
          <Modal.Header closeButton>
            <Modal.Title>New Post in { selectedCourse }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="postTitle"
                placeholder="Post Title"
                value={ this.state.postTitle }
                onChange={ e => this.setState({ postTitle: e.target.value }) }
              />
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="postContent"
                value={ this.state.postContent }
                onChange={ e => this.setState({ postContent: e.target.value }) }
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={ this.hideModal }>
              Cancel
            </Button>
            <Button variant="success" onClick={ this.submitPostClicked }>
              Post
            </Button>
          </Modal.Footer>
        </Modal>
      </>
		)
	}

}

export default NewPost;