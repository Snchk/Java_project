import React from 'react'
import { Link } from 'react-router-dom'
import AccountRepository from '../../repositories/AccountRepository'
import CommentRepository from '../../repositories/CommentRepository'
import Comment from './Comment'
import CommentCreate from './CommentCreate'
import './Comments.css'

export default class CommentSection extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			error: null,
			isLoaded: false,
			discussionId: props.discussionId,
			comments: [],
		}

		this.onCreateComment = this.onCreateComment.bind(this)
		this.onDeleteComment = this.onDeleteComment.bind(this)
	}

	componentDidMount() {
		CommentRepository.getByDiscussionId(this.state.discussionId)
			.then(result => {
				this.setState({
					isLoaded: true,
					comments: result,
				})
			})
			.catch(error => {
				this.setState({
					isLoaded: true,
					error: error,
				})
			})
	}

	onCreateComment(comment) {
		this.state.comments.push(comment)
		this.setState({})
	}

	onDeleteComment(index){
		this.state.comments.splice(index, 1)
		this.setState({})
	}

	render() {
		const { error, isLoaded, comments } = this.state

		if (!isLoaded) return <div>Loading...</div>
		else if (error) return <div>Error: {error.message}</div>
		else {
			let domComments = []

			for (let i = 0; i < comments.length; i++) {
				domComments.push(
					<Comment
						comment={comments[i]}
						key={comments[i].id}
						index={i}
						onDelete={this.onDeleteComment}
					/>
				)
			}

			return (
				<div>
					<h3 className='comment-section-label'>
						{comments.length == 0
							? 'No comments for now'
							: 'Comment section:'}
					</h3>
					<div>{domComments}</div>
					<div>
						{AccountRepository.isLogged() && (
							<CommentCreate
								discussionId={this.state.discussionId}
								onCreate={this.onCreateComment}
							/>
						)}
						{!AccountRepository.isLogged() && (
							<Link
								to={{
									pathname: '/login',
									backpath: window.location.pathname,
								}}
							>
								Please login to leave your comments
							</Link>
						)}
					</div>
				</div>
			)
		}
	}
}
