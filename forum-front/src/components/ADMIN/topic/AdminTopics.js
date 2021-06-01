import React from 'react'
import AccountRepository from '../../../repositories/AccountRepository'
import TopicRepository from '../../../repositories/TopicRepository'
import Back from '../../helpers/Back'
import AdminTopic from './AdminTopic'
import './AdminTopics.css'
import './../Admin.css'

export default class AdminTopics extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoaded: false,
			error: null,
			newTopicError: null,
			updateTopicError: null,
			topics: [],
			newTopicName: '',
			isAdmin: false,
		}

		this.newTopic = this.newTopic.bind(this)
		this.newTopicTextChange = this.newTopicTextChange.bind(this)

		this.onDeleteTopic = this.onDeleteTopic.bind(this)
	}

	componentDidMount() {
		AccountRepository.isAdmin()
			.then(() => {
				this.state.isAdmin = true
				TopicRepository.getAll()
					.then(result => {
						this.setState({
							isLoaded: true,
							topics: result,
						})
					})
					.catch(error => {
						this.setState({
							isLoaded: true,
							error: error,
						})
					})
			})
			.catch(() => this.setState({ isLoaded: true }))
	}

	newTopic(event) {
		event.preventDefault()

		const { newTopicName } = this.state

		if (newTopicName == '' || newTopicName.length < 3) {
			this.setState({
				newTopicError: { message: 'Too few characters (at least 3)' },
			})
			return
		} else {
			this.setState({
				newTopicError: null,
			})
		}

		TopicRepository.createTopic(newTopicName)
			.then(result => {
				this.state.topics.push(result)
				this.setState({
					newTopicName: '',
					newTopicError: null,
				})
			})
			.catch(error => {
				this.setState({
					newTopicError: error,
				})
			})
	}

	newTopicTextChange(event) {
		this.setState({
			newTopicName: event.target.value,
		})
	}

	onDeleteTopic(index) {
		this.state.topics.splice(index, 1)
		this.setState({})
	}

	render() {
		const { isLoaded, error, topics, newTopicError, isAdmin } = this.state
		if (!isLoaded) return <div>Loading...</div>
		else if (error) return <div>Error: {error.message}</div>
		else if (!isAdmin)
			return (
				<div className='admin-container'>
					<h1>Sorry, this page is restricted for you</h1>
					<h4>Login as admin to get access</h4>
					<Back goBack={() => this.props.history.goBack()} />
				</div>
			)

		let domTopics = []

		for (let i = 0; i < topics.length; i++) {
			domTopics.push(
				<AdminTopic
					topic={topics[i]}
					key={topics[i].id}
					onDelete={this.onDeleteTopic}
					index={i}
				/>
			)
		}

		return (
			<div className='container admin-container'>
				<form onSubmit={this.newTopic}>
					<h5>Create topic:</h5>
					<input
						type='text'
						onChange={this.newTopicTextChange}
						value={this.state.newTopicName}
					/>
					<input type='submit' value='Create' />
					<p>{newTopicError && newTopicError.message}</p>
				</form>
				{topics.length > 0 ? (
					<div>
						<h5>All topics:</h5>
						<table className='topics-table'>
							<thead>
								<tr>
									<td>ID</td>
									<td>Name</td>
									<td>Edit</td>
									<td>Delete</td>
								</tr>
							</thead>
							<tbody>{domTopics}</tbody>
						</table>
					</div>
				) : (
					<div>Nothing to manage</div>
				)}
			</div>
		)
	}
}
