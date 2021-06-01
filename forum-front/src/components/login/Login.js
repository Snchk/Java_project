import React from 'react'
import { Link } from 'react-router-dom'
import AccountRepository from '../../repositories/AccountRepository'
import './Login.css'

export default class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			error: null,
			backpath: '',
			loginData: {
				email: '',
				password: '',
			},
		}
		if (!(this.props.location.backpath === undefined)) {
			this.state.backpath = this.props.location.backpath
		}

		this.onFormSubmit = this.onFormSubmit.bind(this)
		this.emailChange = this.emailChange.bind(this)
		this.passwordChange = this.passwordChange.bind(this)
	}

	onFormSubmit(event) {
		event.preventDefault()
		AccountRepository.login(this.state.loginData)
			.then(() => {
				if (this.state.backpath != '')
					window.location.replace(this.state.backpath)
				else window.location.replace('/')
			})
			.catch(error => {
				this.setState({
					error: error,
				})
			})
	}

	emailChange(event) {
		this.state.loginData.email = event.target.value
	}

	passwordChange(event) {
		this.state.loginData.password = event.target.value
	}

	render() {
		if (AccountRepository.isLogged()) this.props.history.push('/')

		return (
			<div className='container login-container'>
				<form onSubmit={this.onFormSubmit}>
					<h2>Login</h2>
					<input
						className='login-email'
						type='text'
						placeholder='Email'
						onChange={this.emailChange}
					/>
					<br />
					<input
						className='login-password'
						type='password'
						placeholder='Password'
						onChange={this.passwordChange}
					/>
					<br />
					<div className='login-error-container'>
						<p className='login-error-message'>
							{this.state.error && (
								<div>Error: {this.state.error.message}</div>
							)}
						</p>
					</div>
					<input className='login-btn' type='submit' value='Login' />
					<br />
				</form>
				<div>
					<Link
						to={{
							pathname: '/registration',
							backpath: this.state.backpath,
						}}
					>
						Create account
					</Link>
				</div>
			</div>
		)
	}
}
