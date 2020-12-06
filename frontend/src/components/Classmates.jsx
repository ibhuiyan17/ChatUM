import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

class Classmates extends Component {
	constructor(props) {
    super(props);

    this.state = {
      members: []
    }
    this.refresh = this.refresh.bind(this);
  }

  async refresh() {
    const url = process.env.REACT_APP_BASE_URL + '/api/courses/all-members/'

    const {
      data: members
    } = await axios.get(url, {
      params: {
        'courseId': this.props.courseId
      }
    });

    this.setState({ members }, () => console.log('fetched my members:', this.state.members));
  }

  componentDidMount() {
      this.refresh()
  }

  componentDidUpdate(prevProps) {
    let { courseId } = this.props

    if (courseId !== prevProps.courseId) {
      console.log('refreshing members list');
      this.refresh();
    }
  }


	render() {
    let { courseId } = this.props;
    var items = this.state.members.map((member, i) => {
      let mailtoString = 'mailto:' + member.email
      return (
        <div key={i.toString()}>
          <small>
          <hr/>
          {member.username}
          <div>
            <a href={mailtoString}><i>{member.email}</i></a>
          </div>
          </small>
        </div>
      )})
      items.reverse()
    console.log(this.state.members)
		return(
		<div className='sidebar-right'>
            <p>All members of this class:</p>
            <div>{items}</div>
		</div>
		)
	}

}

export default Classmates;