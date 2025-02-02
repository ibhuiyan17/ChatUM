import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import axios from 'axios';


/* Component containing all posts */
class Explore extends Component {
	constructor(props) {
    super(props)

    this.state = {
      posts: false
    }
    this.getPosts = this.getPosts.bind(this)
  }

    async getPosts(courseId){
      const url = process.env.REACT_APP_BASE_URL + '/api/posts/all-posts/'

      let {
        data: postsContent
      } = await axios(url, {
        params: {
          courseId: courseId
        }
      });
      return postsContent
    }

    async componentDidMount(){
        let url = process.env.REACT_APP_BASE_URL + "/api/courses/all-courses"

        const {
            data: courses
          } = await axios.get(url);

          this.setState(
            { courses }, () => console.log(this.state)
          );


          var posts = await Promise.all(this.state.courses.map( async (course) => {
            console.log(course)
            url = process.env.REACT_APP_BASE_URL + '/api/posts/all-posts/'

            let {
              data: postsContent
            } = await axios(url, {
              params: {
                courseId: course.id
              }
            })
            postsContent.map((post) => {
              post.courseId = course.id
            })
            return postsContent
          }))
          // flattens all posts in courses into one array of posts
          var allPosts = posts.reduce(
            (a, b) => {
              return a.concat(b);
            }, []
          );
          console.log(allPosts)
          allPosts.sort((a, b) => a.likes.length < b.likes.length ? 1 : -1);

          this.setState({posts: allPosts})
    }

	render() {
    
    var items = null
    if (this.state.posts) {
      
      items = this.state.posts.map((post, i) => (post.likes.length >= 10) ?
        (<div className="post_gold" key={i}>
          <p className="classid">From: {post.courseId}</p>
          <h1 className="title">{post.title}</h1>
          <p className="author"><small>posted by: {post.author}</small></p>
          <p className="content">{post.content}</p>
          <p>{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}</p>
        </div>
      ):(<p></p>));
  }
  console.log(items)
    return(
        <div>
          <h1>See Popular Posts From All Over The School!</h1>
          <p> All posts with 10 or more likes are featured here!</p>
            <div>
                  {
                      this.state.posts && items ?
                      items.map(item => item)
                      : <p>Loading...</p>
                  }
              </div>
        </div>
		)
	}

}

export default Explore;