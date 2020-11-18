import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Comments from './comments';

class Post extends React.Component {
  /* Display number of likes a like/unlike button for one post
   * Reference on forms https://facebook.github.io/react/docs/forms.html
   */

  constructor(props) {
    // Initialize mutable state
    super(props);
    this.state = {
      owner: '', age: '', imgUrl: '', postUrl: '', ownerUrl: '', ownerImg: '', userLikes: 0, numLikes: 0,
    };
    this.handledouble = this.handledouble.bind(this);
    this.updateLike = this.updateLike.bind(this);
  }

  componentDidMount() {
    // This line automatically assigns this.props.url to the const variable url
    const { url } = this.props;
    let likesurl = '';
    likesurl = String(url).concat('likes/');
    // Call REST API to get number of likes
    fetch(url, { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        let readable = data.age;
        readable = moment(readable).fromNow();
        this.setState({
          owner: data.owner,
          age: readable,
          imgUrl: data.img_url,
          postUrl: data.post_show_url,
          ownerUrl: data.owner_show_url,
          ownerImg: data.owner_img_url,
        });
      })
      .catch((error) => console.log(error));

    fetch(likesurl, { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState({
          numLikes: data.likes_count,
          userLikes: data.logname_likes_this,
        });
      })
      .catch((error) => console.log(error));
  }

  updateLike() {
    const { userLikes } = this.state;
    if (userLikes === 1) {
      this.setState((prevState) => ({
        numLikes: prevState.numLikes - 1,
        userLikes: prevState.userLikes - 1,
      }));
    } else {
      this.setState((prevState) => ({
        numLikes: prevState.numLikes + 1,
        userLikes: prevState.userLikes + 1,
      }));
    }
  }

  handledouble() {
    const { userLikes } = this.state;
    const { url } = this.props;
    let likesurl = '';
    likesurl = String(url).concat('likes/');
    if (userLikes === 0) {
      fetch(likesurl, {
        credentials: 'same-origin',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => {
          if (!response.ok) throw Error(response.statusText);
        })
        .then(() => {
          this.setState((prevState) => ({
            numLikes: prevState.numLikes + 1,
            userLikes: prevState.userLikes + 1,
          }));
        })
        .catch((error) => console.log(error));
    }
  }

  render() {
    // This line automatically assigns this.state.numLikes to the const variable numLikes
    const { age } = this.state;
    const { url } = this.props;
    const { imgUrl } = this.state;
    const { ownerUrl } = this.state;
    const { postUrl } = this.state;
    const { owner } = this.state;
    const { ownerImg } = this.state;
    const { numLikes } = this.state;
    let likesurl = '';
    likesurl = String(url).concat('likes/');
    let commentsurl = '';
    commentsurl = String(url).concat('comments/');
    const { userLikes } = this.state;
    // Render number of likes
    return (
      <div className="postwrapper">
        <div className="post">
          <a className="timestamp" href={postUrl}>{age}</a>
          <a className="profilepic" href={ownerUrl}>
            <img src={ownerImg} alt="" width="50" height="50" />
            &nbsp;
            {owner}
          </a>
          <button type="submit" onDoubleClick={this.handledouble}>
            <img className="postimage" src={imgUrl} alt="" />
          </button>
          <div>
            <LikeBox url={likesurl} logLikes={userLikes} updateLike={this.updateLike} />
          </div>
          <div className="likes">
            <p>
              {numLikes}
              {' '}
              like
              {numLikes !== 1 ? 's' : ''}
            </p>
          </div>
          <Comments url={commentsurl} />
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Post;
