import React from 'react'
import TopicRepository from '../../../repositories/TopicRepository'
import './AdminTopics.css'

export default class AdminTopic extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			topic: props.topic,
			editMode: false,
			topicName: props.topic.name,
			error: null,
			deleteError: null,
            index: props.index,
            onDelete: props.onDelete
		}

		this.editModeChange = this.editModeChange.bind(this)
		this.editTopic = this.editTopic.bind(this)
		this.textChange = this.textChange.bind(this)
		this.deleteTopic = this.deleteTopic.bind(this)
	}

	editModeChange(event) {
		this.setState({
			editMode: !this.state.editMode,
		})
	}

	editTopic(event) {
		event.preventDefault()

		const { topic, topicName } = this.state

		if (topicName == topic.name) {
			this.setState({
				editMode: false,
				error: null,
			})
            return
		} else if (topicName == '' || topicName.length < 3) {
			this.setState({
				error: { message: 'Too few characters (at least 3)' },
			})
			return
		} else {
			this.setState({
				error: null,
			})
		}

		TopicRepository.updateTopic(topic.id, topicName)
			.then(result => {
				this.setState({
					editMode: false,
					error: null,
					topic: result,
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
			topicName: event.target.value,
		})
	}

	deleteTopic(event) {
		TopicRepository.deleteTopic(this.state.topic.id)
			.then(() => {
				this.state.onDelete(this.state.index)
			})
			.catch(error => {
				this.setState({
					deleteError: error,
				})
			})
	}

	render() {
		const { topic, editMode, error, deleteError } = this.state
		if (topic == null) return <div></div>
		return (
			<tr>
				<td>{topic.id}</td>
				<td>
					{!editMode ? (
						topic.name
					) : (
						<form onSubmit={this.editTopic}>
							<input
								type='text'
								value={this.state.topicName}
								onChange={this.textChange}
							/>
							<input type='submit' value='Done' />
							<p>{error && error.message}</p>
						</form>
					)}
				</td>
				<td>
					<button onClick={this.editModeChange}>Edit</button>
				</td>
				<td>
					<button onClick={this.deleteTopic}>Delete</button>
					{deleteError && <p>{deleteError.message}</p>}
				</td>
			</tr>
		)
	}
}
