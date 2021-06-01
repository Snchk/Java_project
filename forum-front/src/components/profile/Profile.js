import React from 'react'
import AccountRepository from '../../repositories/AccountRepository'
import ProfileDiscussions from './ProfileDiscussions'
import SavedDiscussions from './SavedDiscussions'
import './Profile.css'

export default class Profile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoaded: false,
			error: null,
			user: {}
		}
	}

	componentDidMount() {
		AccountRepository.getUser()
			.then(result => {
				this.setState({
					isLoaded: true,
					user: result,
				})
			})
			.catch(error => {
				this.setState({
					isLoaded: true,
					error: error,
				})
			})
	}

	render() {
		const { error, isLoaded, user } = this.state

		if (!isLoaded) return <div>Loading...</div>
		else if (error) return <div>Error: {error.message}</div>
		else
			return (
				<div className='container profile-container'>
					<h2>{user.firstName + ' ' + user.lastName}</h2>
					<div className='profile-email'>{user.email}</div>
					<div className='row'>
						<div className='col-md-6'>
							<h3>Your discussions:</h3>
							<ProfileDiscussions />
						</div>
						<div className='col-md-6'>
							<h3>Saved discussions:</h3>
							<SavedDiscussions />
						</div>
					</div>
				</div>
			)
	}
}
