import React from 'react'
import AccountRepository from '../../../repositories/AccountRepository'
import DiscussionRepository from '../../../repositories/DiscussionRepository'
import Back from '../../helpers/Back'
import AdminDiscussion from './AdminDiscussion'
import './../Admin.css'

export default class AdminDiscussions extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoaded: false,
			error: null,
			isAdmin: false,
			discussions: [],
		}

		this.onDeleteDiscussion = this.onDeleteDiscussion.bind(this)
	}

	componentDidMount() {
		AccountRepository.isAdmin()
			.then(() => {
				this.state.isAdmin = true
				DiscussionRepository.getAll()
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
			.catch(() => this.setState({ isLoaded: true }))
	}

	onDeleteDiscussion(index) {
		this.state.discussions.splice(index, 1)
		this.setState({})
	}

	render() {
		const { isLoaded, isAdmin, discussions } = this.state
		if (!isLoaded) return <div>Loading...</div>
		else if (!isAdmin)
			return (
				<div className='admin-container'>
					<h1>Sorry, this page is restricted for you</h1>
					<h4>Login as admin to get access</h4>
					<Back goBack={() => this.props.history.goBack()} />
				</div>
			)

		let domDiscussions = []

		for (let i = 0; i < discussions.length; i++) {
			domDiscussions.push(
				<AdminDiscussion
					discussion={discussions[i]}
					key={discussions[i].id}
					index={i}
					onDelete={this.onDeleteDiscussion}
				/>
			)
		}

		return (
			<div className='container admin-container'>
				{discussions.length > 0 ? (
					<div>
						<h5>All discussions:</h5>
						<table className='discussions-table'>
							<thead>
								<tr>
									<td>ID</td>
									<td>Author</td>
									<td>Topic</td>
									<td>Discussion</td>
									<td>Date</td>
									<td>Text</td>
									<td>Delete</td>
								</tr>
							</thead>
							<tbody>{domDiscussions}</tbody>
						</table>
					</div>
				) : (
					<div>Nothing to manage :)</div>
				)}
			</div>
		)
	}
}
