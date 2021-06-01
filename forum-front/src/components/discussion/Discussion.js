import moment from 'moment'
import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AccountRepository from '../../repositories/AccountRepository'
import DiscussionRepository from '../../repositories/DiscussionRepository'
import CommentSection from '../comment/CommentSection'
import Back from '../helpers/Back'
import './Discussion.css'

export default class Discussion extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoaded: false,
			error: null,
			discussionId: props.match.params.discussionId,
			discussion: {},
			edit: false,
			newTitle: '',
			newText: '',
			errorTitle: null,
			errorText: null,
			isSaved: false,
		}

		this.editDiscussion = this.editDiscussion.bind(this)
		this.deleteDiscussion = this.deleteDiscussion.bind(this)
		this.confirmUpdate = this.confirmUpdate.bind(this)
		this.titleChange = this.titleChange.bind(this)
		this.textChange = this.textChange.bind(this)
		this.cancelUpdate = this.cancelUpdate.bind(this)
		this.saveDiscussion = this.saveDiscussion.bind(this)
	}

	componentDidMount() {
		DiscussionRepository.getById(this.state.discussionId)
			.then(result => {
				this.setState({
					isLoaded: true,
					discussion: result,
					newTitle: result.title,
					newText: result.text,
				})
			})
			.catch(err => {
				this.setState({
					isLoaded: true,
					error: err,
				})
			})
		DiscussionRepository.isSaved(this.state.discussionId).then(res =>
			this.setState({ isSaved: res })
		)
	}

	editDiscussion(event) {
		this.setState({
			edit: true,
		})
	}

	deleteDiscussion(event) {
		DiscussionRepository.deleteDiscussion(this.state.discussionId)
			.then(() =>
				window.location.replace('/topics/' + this.state.discussion.topicId)
			)
			.catch(error => {
				this.setState({
					error: error,
				})
			})
	}

	confirmUpdate(event) {
		event.preventDefault()

		const { newText, newTitle, discussion } = this.state

		if (newText.length < 20) {
			this.setState({
				errorText: { message: 'Text must contain at least 20 characters!' },
			})
			return
		} else if (newText == discussion.text) {
			this.setState({
				errorText: null,
			})
		}

		if (newTitle.length < 5) {
			this.setState({
				errorTitle: {
					message: 'Title must contain at least 5 characters!',
				},
			})
			return
		} else if (newTitle == discussion.title) {
			this.setState({
				errorTitle: null,
			})
		}

		DiscussionRepository.updateDiscussion(
			this.state.discussionId,
			newTitle,
			newText
		)
			.then(result => {
				this.setState({
					edit: false,
					newText: result.text,
					newTitle: result.title,
					discussion: result,
					errorText: null,
					errorTitle: null,
				})
			})
			.catch(err => {
				this.setState({
					error: err,
				})
			})
	}

	titleChange(event) {
		this.setState({
			newTitle: event.target.value,
		})
	}

	textChange(event) {
		this.setState({
			newText: event.target.value,
		})
	}

	cancelUpdate(event) {
		this.setState({
			edit: false,
			newTitle: this.state.discussion.title,
			newText: this.state.discussion.text,
		})
	}

	saveDiscussion(event) {
		DiscussionRepository.save(this.state.discussionId)
			.then(result => {
				this.setState({
					isSaved: result,
				})
			})
			.catch(error => this.setState({ error: error }))
	}

	render() {
		const { isLoaded, error, discussion } = this.state

		if (!isLoaded) return <div>Loading...</div>
		else if (error) return <div>Error: {error.message}</div>
		else
			return (
				<div className='container discussion-container'>
					<Back goBack={() => this.props.history.goBack()} />
					<button
						onClick={this.saveDiscussion}
						className='discussion-sabe-btn'
					>
						{this.state.isSaved ? 'Saved' : 'Save'}
					</button>
					<h4 className='discussion-topic-label'>
						<Link to={'/topics/' + discussion.topicId}>
							{discussion.topicName}
						</Link>
					</h4>
					<div className='discussion-data-container'>
						{AccountRepository.getId() == discussion.authorId &&
							!this.state.edit && (
								<NavDropdown className='discussion-manage-dropdown' title='Manage'>
									<NavDropdown.Item onClick={this.editDiscussion}>
										Edit
									</NavDropdown.Item>
									<NavDropdown.Item onClick={this.deleteDiscussion}>
										Delete
									</NavDropdown.Item>
								</NavDropdown>
							)}
						{!this.state.edit ? (
							<div>
								<h2>{discussion.title}</h2>
								<div>
									{discussion.authorFirstName +
										' ' +
										discussion.authorLastName}
								</div>
								<div>
									{moment(discussion.creationDate).format(
										'HH:mm d-MMM-YYYY'
									)}
								</div>
								<div className='discussion-text'>{discussion.text}</div>
							</div>
						) : (
							<div>
								<h3>Edit mode</h3>
								<form onSubmit={this.confirmUpdate}>
									<input
										type='text'
										onChange={this.titleChange}
										value={this.state.newTitle}
									/>
									<textarea
										onChange={this.textChange}
										value={this.state.newText}
									/>
									<input type='submit' value='Update' />
									<button onClick={this.cancelUpdate}>Cancel</button>
								</form>
							</div>
						)}
					</div>
					<CommentSection discussionId={discussion.id} />
				</div>
			)
	}
}
