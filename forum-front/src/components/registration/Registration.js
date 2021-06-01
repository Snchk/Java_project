import React from 'react'
import { Link } from 'react-router-dom'
import AccountRepository from '../../repositories/AccountRepository'
import Back from '../helpers/Back'
import './Registration.css'

class Registration extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoaded: false,
			error: null,
			registrationData: {
				firstName: '',
				lastName: '',
				email: '',
				password: '',
			},
			backpath: '',
		}

		if (!(this.props.location.backpath === undefined)) {
			this.state.backpath = this.props.location.backpath
		}

		this.onFormSubmit = this.onFormSubmit.bind(this)
		this.firstNameChange = this.firstNameChange.bind(this)
		this.lastNameChange = this.lastNameChange.bind(this)
		this.emailChange = this.emailChange.bind(this)
		this.passwordChange = this.passwordChange.bind(this)
		this.repeatPasswordChange = this.repeatPasswordChange.bind(this)
	}

	componentDidMount() {
		this.setState({ isLoaded: true })
	}

	onFormSubmit(event) {
		event.preventDefault()
		AccountRepository.register(this.state.registrationData)
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

	firstNameChange(event) {
		this.state.registrationData.firstName = event.target.value
	}

	lastNameChange(event) {
		this.state.registrationData.lastName = event.target.value
	}

	emailChange(event) {
		this.state.registrationData.email = event.target.value
	}

	passwordChange(event) {
		this.state.registrationData.password = event.target.value
	}

	repeatPasswordChange(event) {
		if (event.target.value != this.state.registrationData.password)
			document.getElementById('repeat').className = 'repeat'
		else document.getElementById('repeat').className = ''
	}

	render() {
		if (AccountRepository.isLogged()) this.props.history.push('/')

		const { isLoaded, error, registrationData } = this.state

		if (!isLoaded) return <div>Loading...</div>
		else
			return (
				<div className='container registration-container'>
					<form onSubmit={this.onFormSubmit}>
						<h2>Registration</h2>
						<input
							className='registration-field'
							type='text'
							placeholder='First name'
							onChange={this.firstNameChange}
						/>
						<br />
						<input
							className='registration-field'
							type='text'
							placeholder='Last name'
							onChange={this.lastNameChange}
						/>
						<br />
						<input
							className='registration-field'
							type='text'
							placeholder='Email'
							onChange={this.emailChange}
						/>
						<br />
						<input
							className='registration-field'
							type='password'
							placeholder='Password'
							onChange={this.passwordChange}
						/>
						<br />
						<input
							className='registration-field'
							type='password'
							placeholder='Repeat password'
							onChange={this.repeatPasswordChange}
							id='repeat'
						/>
						<br />
						<div className='registration-error-container'>
							<p className='registration-error-message'>
								{error && error.message}
							</p>
						</div>
						<input
							className='registration-btn'
							type='submit'
							value='Register'
						/>
						<br />
					</form>
					<div>
						<Link
							to={{
								pathname: '/login',
								backpath: this.state.backpath,
							}}
						>
							Already have an account? Login
						</Link>
					</div>
				</div>
			)
	}
}

export default Registration
