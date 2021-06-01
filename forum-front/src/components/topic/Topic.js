import moment from 'moment'
import React from 'react'
import TopicRepository from '../../repositories/TopicRepository'
import DiscussionRepository from '../../repositories/DiscussionRepository'
import { Link } from 'react-router-dom'
import Back from '../helpers/Back'
import './Topic.css'

export default class Topic extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoaded: false,
			error: null,
			topicId: this.props.match.params.topicId,
			topic: {
				id: Number,
				name: String,
			},
			discussions: [
				{
					id: Number,
					topicId: Number,
					authorId: String,
					title: String,
					text: String,
					creationDate: Date,
				},
			],
		}
	}

	componentDidMount() {
		TopicRepository.getById(this.state.topicId)
			.then(res => {
				this.state.topic = res
				DiscussionRepository.getByTopicId(this.state.topicId)
					.then(result => {
						this.setState({
							isLoaded: true,
							discussions: result,
						})
					})
					.catch(error => {
						this.setState({
							isLoaded: true,
							error: error,
						})
					})
			})
			.catch(err => {
				this.setState({
					isLoaded: true,
					error: err,
				})
			})
	}

	render() {
		const { isLoaded, error, topic, discussions } = this.state

		if (!isLoaded) return <div>Loading...</div>
		else if (error) return <div>Error: {error.message}</div>
		else
			return (
				<div className='container topic-container'>
					<Back goBack={() => this.props.history.goBack()} />
					<h2 className='topic-label'>{topic.name}</h2>
					<div>
						{discussions.length == 0 ? (
							<div>No discussions in this topic</div>
						) : (
							discussions.map(el => {
								return (
									<div className='topic-exact-discussion' key={el.id}>
										<Link to={'/discussions/' + el.id}>
											<div className='topic-exact-discussion-title'>
												{el.title}
											</div>

											<div className='topic-exact-discussion-date-author'>
												<div className='topic-exact-discussion-author'>
													{el.authorFirstName +
														' ' +
														el.authorLastName}
												</div>
												<div className='topic-exact-discussion-date'>
													{moment(el.creationDate).format(
														'd-MMM-YYYY'
													)}
												</div>
											</div>
											<div className='topic-exact-discussion-text-demo'>
												{el.text.substring(0, 150) + '...'}
											</div>
										</Link>
									</div>
								)
							})
						)}
					</div>
				</div>
			)
	}
}
