import React from 'react'
import { Link } from 'react-router-dom'
import AccountRepository from '../../repositories/AccountRepository'
import DiscussionRepository from '../../repositories/DiscussionRepository'
import TopicRepository from '../../repositories/TopicRepository'
import Back from '../helpers/Back'

export default class CommentCreate extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			error: null,
			inputError: null,
			isLoaded: false,
			topics: [],
			topicId: -1,
			title: '',
			text: '',
		}

		this.createDiscussion = this.createDiscussion.bind(this)
		this.changeTopic = this.changeTopic.bind(this)
        this.changeTitle = this.changeTitle.bind(this)
        this.changeText = this.changeText.bind(this)
	}

	componentDidMount() {
		TopicRepository.getAll()
			.then(result => {
				this.setState({
					isLoaded: true,
					topics: result,
				})
				this.state.topicId = this.state.topics[0].id
			})
			.catch(error => {
				this.setState({
					isLoaded: true,
					error: error,
				})
			})
	}

	changeTopic(event) {
		this.state.topicId = event.target.value
	}
	changeTitle(event) {
		this.state.title = event.target.value
	}
	changeText(event) {
		this.state.text = event.target.value
	}

	createDiscussion(event) {
        event.preventDefault()
		const { topicId, title, text } = this.state

		if (title.length < 5) {
			this.setState({
				inputError: {
					message: 'Title must contain at least 5 characters',
				},
			})
			return
		} else if (text.length < 20) {
			this.setState({
				inputError: {
					message: 'Text must contain at least 20 characters',
				},
			})
			return
		} else this.setState({ inputError: null })

		DiscussionRepository.create(topicId, title, text)
			.then(result => window.location.replace('/discussions/' + result.id))
			.catch(error =>
				this.setState({
					error: error,
				})
			)
	}

	render() {
		const { topics, text, title, inputError, error, isLoaded } = this.state
        if (!AccountRepository.isLogged())
            return (
					<div>
						<h2>You must login to create discussions</h2>
						<Link
							to={{
								pathname: '/login',
								backpath: this.props.location.pathname,
							}}
						>
							Login page
						</Link>
					</div>
				)
		else if (!isLoaded) return <div>Loading...</div>
		else if (error) return <div>Error: {error.message}</div>
		else
			return (
				<div className='container create-discussion-container'>
					<Back goBack={() => this.props.history.goBack()} />
					<h2 className='create-discussion-label'>Create discussion</h2>
					<form onSubmit={this.createDiscussion}>
						<select
							className='create-discussion-topic'
							onChange={this.changeTopic}
							defaultValue={topics[0].id}
						>
							{topics.map(el => {
								return (
									<option key={el.id} value={el.id}>
										{el.name}
									</option>
								)
							})}
						</select>
						<br />
						<input
							className='create-discussion-title'
							type='text'
							onChange={this.changeTitle}
						/>
						<br />
						<textarea
							className='create-discussion-text'
							onChange={this.changeText}
						/>
						<div className='create-discussion-error-message-container'>
							<p className='create-discussion-error-message'>
								{inputError && inputError.message}
							</p>
						</div>
						<input
							className='create-discussion-btn'
							type='submit'
							value='Create'
						/>
					</form>
				</div>
			)
	}
}
