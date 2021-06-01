import React from 'react'
import AccountRepository from '../../repositories/AccountRepository'
import { Button, Nav, NavDropdown } from 'react-bootstrap'
import './Header.css'
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isAdmin: false,
		}
	}

	componentDidMount() {
		AccountRepository.isAdmin().then(() => this.setState({ isAdmin: true }))
	}

	render() {
		return (
			<div className='header'>
				<Nav className='container'>
					<Nav.Item>
						<Link to={'/'}>
							<img
								src='https://cdn.iconscout.com/icon/free/png-256/home-1767389-1505253.png'
								id='home_img'
							/>
						</Link>
					</Nav.Item>

					{!AccountRepository.isLogged() && (
						<NavDropdown title='Login' id='dropdown'>
							<NavDropdown.Item href='/login' id='login_btn'>
								Login
							</NavDropdown.Item>
							<NavDropdown.Item href='/registration' id='register_btn'>
								Registration
							</NavDropdown.Item>
						</NavDropdown>
					)}
					{AccountRepository.isLogged() && (
						<NavDropdown title='Profile' id='dropdown'>
							<NavDropdown.Item href='/profile'>
								Profile
							</NavDropdown.Item>
							<NavDropdown.Item
								variant='secondary'
								id='create_dis'
								href='/discussions/create'
							>
								Create discussion
							</NavDropdown.Item>
							<NavDropdown.Divider />
							{this.state.isAdmin && (
								<NavDropdown.Item href='/admin'>
									Admin page
								</NavDropdown.Item>
							)}
							<NavDropdown.Divider />
							<NavDropdown.Item
								id='logout_btn'
								onClick={() => {
									AccountRepository.logout()
								}}
							>
								Sign Out
							</NavDropdown.Item>
						</NavDropdown>
					)}
				</Nav>
			</div>
		)
	}
}
