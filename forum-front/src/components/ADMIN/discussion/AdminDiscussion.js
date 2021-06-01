import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import DiscussionRepository from '../../../repositories/DiscussionRepository'

export default class AdminDiscussion extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			discussion: props.discussion,
			error: null,
			onDelete: props.onDelete,
			index: props.index,
		}

		this.deleteDiscussion = this.deleteDiscussion.bind(this)
	}

	deleteDiscussion(event) {
		DiscussionRepository.deleteDiscussion(this.state.discussion.id)
			.then(() => {
				this.state.onDelete(this.state.index)
			})
			.catch(error => {
				this.setState({
					error: error,
				})
			})
	}

	render() {
		const { discussion, error } = this.state
		if (discussion == null) return <div></div>
		return (
			<tr>
				<td>{discussion.id}</td>
				<td>
					{discussion.authorFirstName + ' ' + discussion.authorLastName}
				</td>
				<td>
					<Link to={'/topics/' + discussion.topicId}>
						{discussion.topicName}
					</Link>
				</td>
				<td>
					<Link to={'/discussions/' + discussion.id}>
						{discussion.title}
					</Link>
				</td>
				<td>{moment(discussion.creationDate).format('HH:mm d-MMM-YYYY')}</td>
				<td>{discussion.text}</td>
				<td>
					<button onClick={this.deleteDiscussion}>Delete</button>
					{error && <p>{error.message}</p>}
				</td>
			</tr>
		)
	}
}
