import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import CommentRepository from '../../../repositories/CommentRepository'

export default class AdminComment extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			comment: props.comment,
			error: null,
			onDelete: props.onDelete,
			index: props.index,
		}

		this.deleteComment = this.deleteComment.bind(this)
	}

	deleteComment(event) {
		CommentRepository.deleteComment(this.state.comment.id)
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
		const { comment, error } = this.state
		if (comment == null) return <div></div>
		return (
			<tr>
				<td>{comment.id}</td>
				<td>{comment.authorFirstName + ' ' + comment.authorLastName}</td>
				<td>
					<Link to={'/discussions/' + comment.discussionId}>
						{comment.discussionTitle}
					</Link>
				</td>
				<td>{moment(comment.creationDate).format('HH:mm d-MMM-YYYY')}</td>
				<td>{comment.text}</td>
				<td>
					<button onClick={this.deleteComment}>Delete</button>
					{error && <p>{error.message}</p>}
				</td>
			</tr>
		)
	}
}
