import React from 'react';
import PropTypes from 'prop-types';


class Post extends React.Component {


  constructor(props) {
    // Initialize mutable state
    super(props);
    //this.updateLike = this.updateLike.bind(this);
  }

  /* componentDidMount() {
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
  } */

/*   updateLike() {
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
  } */


  render() {
    // This line automatically assigns this.state.numLikes to the const variable numLikes
    const { content } = this.props;
    const { owner } = this.props;
    // Render number of likes
    return (
      <div className="postwrapper">
        <div className="post">
            {owner}
        </div>
        <div>
            {content}
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  content: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
};

export default Post;
