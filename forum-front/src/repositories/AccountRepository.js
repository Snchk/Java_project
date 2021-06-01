import BaseRepository from './BaseRepository'

export default class AccountRepository {
	static async register(registrationData) {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(registrationData),
		}

		return fetch(BaseRepository.baseUrl + '/auth/register', requestOptions)
			.then(BaseRepository.handleError)
			.then(response => {
				sessionStorage.setItem('userCredentials', JSON.stringify(response))
				return
			})
	}

	static async login(loginData) {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(loginData),
		}

		return fetch(BaseRepository.baseUrl + '/auth/login', requestOptions)
			.then(BaseRepository.handleError)
			.then(response => {
				sessionStorage.setItem('userCredentials', JSON.stringify(response))
				return
			})
	}

	static logout() {
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: AccountRepository.getId(),
				token: JSON.parse(sessionStorage.getItem('userCredentials'))?.token,
			}),
		}
		fetch(BaseRepository.baseUrl + '/auth/logout', requestOptions)
			.then(BaseRepository.handleError)
			.then(() => {
				sessionStorage.removeItem('userCredentials')
				window.location.replace('/')
			})
	}

	static isLogged() {
		return !(sessionStorage.getItem('userCredentials') == null)
	}

	static getUser() {
		return fetch(
			BaseRepository.baseUrl + '/users/' + AccountRepository.getId(),
			{
				headers: {
					Authorization: AccountRepository.getToken(),
				},
			}
		).then(BaseRepository.handleError)
	}

	static getToken() {
		if (AccountRepository.isLogged())
			return (
				'Bearer ' +
				JSON.parse(sessionStorage.getItem('userCredentials'))?.token
			)
		else return 'none'
	}

	static getId() {
		if (AccountRepository.isLogged())
			return JSON.parse(sessionStorage.getItem('userCredentials'))?.id
		else return -1
	}

	static async isAdmin() {
		return fetch(BaseRepository.baseUrl + '/auth/is-admin', {
			headers: { Authorization: AccountRepository.getToken() },
		}).then(BaseRepository.handleError)
	}
}
