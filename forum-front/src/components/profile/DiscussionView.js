import React from 'react'
import { Link } from 'react-router-dom'
import DiscussionRepository from '../../repositories/DiscussionRepository'

export default class DiscussionView extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			discussion: props.discussion,
		}
	}

	render() {
		return (
			<div className='discussion-view-container'>
				<Link to={'/discussions/' + this.state.discussion.id}>
					<div className='discussion-view-link'>
						{this.state.discussion.title}
					</div>
				</Link>
			</div>
		)
	}
}
