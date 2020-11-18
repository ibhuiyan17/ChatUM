import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

class Page extends React.Component {
  /* Display number of likes a like/unlike button for one post
   * Reference on forms https://facebook.github.io/react/docs/forms.html
   */

  constructor(props) {
    // Initialize mutable state
    super(props);
    this.state = { posts: [], hasMore: '' };
    this.fetchmoredata = this.fetchmoredata.bind(this);
  }

  componentDidMount() {
    // This line automatically assigns this.props.url to the const variable url
    const { url } = this.props;

    // Call REST API to get number of likes
    fetch(url, { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState({
          posts: data.results,
        });
      })
      .catch((error) => console.log(error));
  }

  fetchmoredata() {
    const { hasMore } = this.state;
    console.log(hasMore);
    // Call REST API to get number of likes
    fetch(hasMore, { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState((prevState) => ({
          posts: prevState.posts.concat(data.results),
          hasMore: data.next,
        }));
      })
      .catch((error) => console.log(error));
  }

  render() {
    // This line automatically assigns this.state.numLikes to the const variable numLikes
    const { posts } = this.state;
    // Render number of likes
    return (
        <div>
          {posts.map((post, i) => (
            <Post key={i.toString()} url={post.url} />
          ))}
        </div>
    );
  }
}

Page.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Page;
