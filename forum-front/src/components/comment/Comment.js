import moment from 'moment'
import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import AccountRepository from '../../repositories/AccountRepository'
import CommentRepository from '../../repositories/CommentRepository'

export default class Comment extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			comment: props.comment,
			error: null,
			onDelete: props.onDelete,
			index: props.index,
			edit: false,
			newText: props.comment.text,
		}

		this.editComment = this.editComment.bind(this)
		this.acceptEdit = this.acceptEdit.bind(this)
		this.deleteComment = this.deleteComment.bind(this)
		this.textChange = this.textChange.bind(this)
		this.undoUpdate = this.undoUpdate.bind(this)
	}

	editComment(event) {
		this.setState({
			edit: true,
		})
	}

	acceptEdit(event) {
		event.preventDefault()

		const { newText } = this.state
		if (newText.length < 5) {
			this.setState({
				error: { message: 'Comment must contain at least 5 characterss' },
			})
			return
		} else if (newText == this.state.comment.text) {
			this.setState({
				error: null,
				edit: false,
			})
			return
		}

		CommentRepository.updateComment(this.state.comment.id, newText)
			.then(result => {
				this.setState({
					edit: false,
					newText: result.text,
					comment: result,
					error: null,
				})
			})
			.catch(err => {
				this.setState({
					error: err,
				})
			})
	}

	deleteComment(event) {
		CommentRepository.deleteComment(this.state.comment.id)
			.then(() => {
				this.state.onDelete(this.state.index)
				this.setState({
					comment: null,
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
			newText: event.target.value,
		})
	}

	undoUpdate(event) {
		this.setState({
			edit: false,
			newText: this.state.comment,
		})
	}

	render() {
		const comment = this.state.comment
		if (comment == null) return <></>
		return (
			<div className='comment-item'>
				<div className='comment-item-data'>
					<div className='comment-item-author'>
						{comment.authorFirstName + ' ' + comment.authorLastName}
					</div>
					<div className='comment-item-date'>
						{moment(comment.creationDate).format('HH:mm D MMM YYYY')}
					</div>
				</div>
				<div className='comment-item-manage'>
					{AccountRepository.getId() == comment.authorId &&
						!this.state.edit && (
							<NavDropdown
								className='comment-action-dropdown'
								title='Edit'
							>
								<NavDropdown.Item onClick={this.editComment}>
									Edit
								</NavDropdown.Item>
								<NavDropdown.Item onClick={this.deleteComment}>
									Delete
								</NavDropdown.Item>
							</NavDropdown>
						)}
				</div>
				<div className='comment-item-text'>
					{!this.state.edit ? (
						comment.text
					) : (
						<form onSubmit={this.acceptEdit}>
							<textarea
								className='edit-comment-text'
								value={this.state.newText}
								onChange={this.textChange}
							/>
							<input
								className='edit-comment-btn'
								type='submit'
								value='Update'
							/>
							<button
								className='edit-comment-btn'
								onClick={this.undoUpdate}
							>
								Cancel
							</button>
						</form>
					)}
				</div>
			</div>
		)
	}
}
