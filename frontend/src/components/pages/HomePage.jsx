import React, { Component } from 'react';
import axios from 'axios';

class HomePage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			courses : []
		};
	}

async componentDidMount() {
	const url = 'http://localhost:5001/webapp-17d6b/us-central1/api/courses/subscribed-courses/'

	const courses = await axios.get(url, {
		'userId': this.props.userId
	});
	this.setState({ courses }, () => console.log('fetched my courses:', this.state.courses));

}

	render() {
		return(
			<>
				<div>
					<h1>{this.props.userId}</h1>
				</div>
						<div>
								{this.state.courses.map((course, i) => (
										<p key={i.toString()}>
												{ course.name }
										</p>
									))}
						</div>

			</>
		)
	}

}

export default HomePage;