import React from 'react'
import DiscussionRepository from '../../repositories/DiscussionRepository'
import DiscussionView from './DiscussionView'

export default class SavedDiscussions extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoaded: false,
			error: null,
			discussions: [],
		}
	}

	componentDidMount() {
		DiscussionRepository.getSaved()
			.then(result => {
				this.setState({
					discussions: result,
					isLoaded: true,
				})
			})
			.catch(error => {
				this.setState({
					isLoaded: true,
					error: false,
				})
			})
	}

	render() {
		const { isLoaded, error, discussions } = this.state

		if (!isLoaded) return <div>Loading...</div>
		else if (error) return <div>Error: {error.message}</div>
		else
			return (
				<div>
					{discussions.map(el => {
						return <DiscussionView discussion={el} />
					})}
				</div>
			)
	}
}
