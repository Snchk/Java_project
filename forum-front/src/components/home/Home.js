import React from 'react'
import { Link } from 'react-router-dom'
import TopicRepository from '../../repositories/TopicRepository'
import DiscussionRepository from '../../repositories/DiscussionRepository'
import moment from 'moment'
import './Home.css'

export default class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			error: null,
			isLoaded: false,
			topics: [
				{
					id: Number,
					name: String,
				},
			],
			discussions: [],
			discussionsAmount: 10,
		}
	}

	componentDidMount() {
		TopicRepository.getAll()
			.then(result => {
				this.state.topics = result
				DiscussionRepository.getPopular(this.state.discussionsAmount)
					.then(res => {
						this.setState({
							discussions: res,
							isLoaded: true,
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
		const { isLoaded, error, topics, discussions } = this.state

		if (!isLoaded) return <div>Loading...</div>
		else if (error) return <div>Error: {error.message}</div>
		else
			return (
				<div className='container'>
					<div className='row home-container'>
						{discussions && (
							<div className='col-md-8 home-discussions'>
								<h3 className='home-discussions-label'>
									Popular discussions:
								</h3>
								<div>
									{discussions.map(el => {
										return (
											<div
												className='home-exact-discussion'
												key={el.id}
											>
												<Link to={'/discussions/' + el.id}>
													<div className='home-exact-discussion-title'>
														{el.title}
													</div>

													<div className='home-exact-discussion-date-author'>
														<div className='home-exact-discussion-author'>
															{el.authorFirstName +
																' ' +
																el.authorLastName}
														</div>
														<div className='home-exact-discussion-date'>
															{moment(el.creationDate).format(
																'd-MMM-YYYY'
															)}
														</div>
													</div>
													<div className='home-exact-discussion-text-demo'>
														{el.text.substring(0, 100) + '...'}
													</div>
												</Link>
											</div>
										)
									})}
								</div>
							</div>
						)}
						{topics ? (
							<div className='col-md-4 home-topics'>
								<h3 className='home-topics-label'>Topics:</h3>
								<div className='home-topics-container'>
									{topics.map(el => {
										return (
											<div className='home-exact-topic'>
												<Link to={'/topics/' + el.id} topic={el}>
													{el.name}
												</Link>
											</div>
										)
									})}
								</div>
							</div>
						) : (
							!topics && <div className='col-md-4'>No topics</div>
						)}
					</div>
				</div>
			)
	}
}
