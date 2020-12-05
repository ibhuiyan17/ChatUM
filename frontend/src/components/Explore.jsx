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
      const url = 'http://localhost:5001/webapp-17d6b/us-central1/api/posts/all-posts/'

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
        let url = "http://localhost:5001/webapp-17d6b/us-central1/api/courses/all-courses"

        const {
            data: courses
          } = await axios.get(url);

          this.setState(
            { courses }, () => console.log(this.state)
          );


          var posts = await Promise.all(this.state.courses.map( async (course) => {
            console.log(course)
            url = 'http://localhost:5001/webapp-17d6b/us-central1/api/posts/all-posts/'

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
        items = this.state.posts.map((post, i) => (
          <div className="post" key={i}>
            <p className="classid">{post.courseId}</p>
            <h3 className="title">{post.title}</h3>
            <p className="content">{post.content}</p>
            <p className="author"><small>posted by: {post.author}</small></p>
            <p>{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}</p>
          </div>
        ))
    }
    console.log(items)
    return(
        <div>
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