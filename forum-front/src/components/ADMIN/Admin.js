import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AccountRepository from '../../repositories/AccountRepository'
import Back from '../helpers/Back'
import './Admin.css'

export default class Admin extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isAdmin: false,
			isLoaded: false,
		}
	}

	componentDidMount() {
		AccountRepository.isAdmin()
			.then(() => this.setState({ isAdmin: true, isLoaded: true }))
			.catch(() => this.setState({ isLoaded: true }))
	}

	render() {
		const { isLoaded, isAdmin } = this.state
		if (!isLoaded) return <div>Loading...</div>
		else if (!isAdmin)
			return (
				<div>
					<h1>Sorry, this page is restricted for you</h1>
					<h4>Login as admin to get access</h4>
					<Back goBack={() => this.props.history.goBack()} />
				</div>
			)
		return (
			<div className='container admin-container'>
				<h1>Admin managing</h1>
				<Nav className='admin-navbar'>
					<Nav.Item className='admin-navbar-item'>
						<Link to='/admin/topics'>Topics</Link>
					</Nav.Item>
					<Nav.Item className='admin-navbar-item'>
						<Link to='/admin/discussions'>Discussions</Link>
					</Nav.Item>
					<Nav.Item className='admin-navbar-item'>
						<Link to='/admin/comments'>Comments</Link>
					</Nav.Item>
				</Nav>
			</div>
		)
	}
}
