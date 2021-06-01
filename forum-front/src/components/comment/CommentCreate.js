import React from 'react'
import CommentRepository from '../../repositories/CommentRepository'

export default class CommentCreate extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			error: null,
			discussionId: props.discussionId,
			commentText: '',
			onCreate: props.onCreate,
		}
		this.createComment = this.createComment.bind(this)
		this.textChange = this.textChange.bind(this)
	}

	createComment(event) {
		event.preventDefault()

		if (this.state.commentText.length < 5) {
			this.setState({
				error: {
					message: 'Comment must contain at least 5 characters',
				},
			})
			return
		} else
			this.setState({
				error: null,
			})

		CommentRepository.createComment(
			this.state.discussionId,
			this.state.commentText
		)
			.then(response => {
				this.state.onCreate(response)
				this.setState({
					error: null,
					commentText: '',
				})
			})
			.catch(error => {
				this.setState({
					error: error,
				})
			})
	}

	textChange(event) {
		this.setState({
			commentText: event.target.value,
		})
	}

	render() {
		const { error } = this.state
		return (
			<div>
				<h4 className='create-comment-label'>
					Can help? Write your comment here:
				</h4>
				<form onSubmit={this.createComment}>
					<textarea
						onChange={this.textChange}
						value={this.state.commentText}
						className='create-comment-text'
					/>
					<div className='create-comment-error-message-container'>
						<p className='create-comment-error-message'>
							{error && error.message}
						</p>
					</div>
					<input
						className='create-comment-btn'
						type='submit'
						value='Create'
					/>
				</form>
			</div>
		)
	}
}
