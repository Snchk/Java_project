import AccountRepository from './AccountRepository'
import BaseRepository from './BaseRepository'

export default class TopicRepository {
	static async getAll() {
		return fetch(BaseRepository.baseUrl + '/topics').then(
			BaseRepository.handleError
		)
	}

	static async getById(id) {
		return fetch(BaseRepository.baseUrl + '/topics/' + id).then(
			BaseRepository.handleError
		)
	}

	static async createTopic(name) {
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: AccountRepository.getToken(),
			},
			body: name,
		}

		return fetch(BaseRepository.baseUrl + '/topics', requestOptions).then(
			BaseRepository.handleError
		)
	}

	static async updateTopic(id, name) {
		const requestOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: AccountRepository.getToken(),
			},
			body: JSON.stringify({
				id: id,
				name: name,
			}),
		}

		return fetch(BaseRepository.baseUrl + '/topics', requestOptions).then(
			BaseRepository.handleError
		)
	}

	static async deleteTopic(id){
		const requestOptions = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: AccountRepository.getToken(),
			}
		}

		return fetch(BaseRepository.baseUrl + '/topics/' + id, requestOptions).then(
			BaseRepository.handleError
		)
	}
}
