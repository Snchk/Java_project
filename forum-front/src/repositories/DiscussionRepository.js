import AccountRepository from './AccountRepository'
import BaseRepository from './BaseRepository'

export default class DiscussionRepository {
	static async getAll() {
		return fetch(BaseRepository.baseUrl + '/discussions').then(
			BaseRepository.handleError
		)
	}

	static async getByTopicId(id) {
		return fetch(BaseRepository.baseUrl + '/discussions/topic/' + id).then(
			BaseRepository.handleError
		)
	}

	static async getById(id) {
		return fetch(BaseRepository.baseUrl + '/discussions/' + id).then(
			BaseRepository.handleError
		)
	}

	static async create(topicId, title, text) {
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: AccountRepository.getToken(),
			},
			body: JSON.stringify({
				authorId: AccountRepository.getId(),
				topicId: topicId,
				title: title,
				text: text,
			}),
		}

		return fetch(
			BaseRepository.baseUrl + '/discussions',
			requestOptions
		).then(BaseRepository.handleError)
	}

	static async deleteDiscussion(id) {
		const requestOptions = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: AccountRepository.getToken(),
			},
		}

		return fetch(
			BaseRepository.baseUrl + '/discussions/' + id,
			requestOptions
		).then(BaseRepository.handleError)
	}

	static async updateDiscussion(id, title, text) {
		const requestOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: AccountRepository.getToken(),
			},
			body: JSON.stringify({
				id: id,
				title: title,
				text: text,
			}),
		}

		return fetch(
			BaseRepository.baseUrl + '/discussions',
			requestOptions
		).then(BaseRepository.handleError)
	}

	static async save(id) {
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: AccountRepository.getToken(),
			},
			body: JSON.stringify({
				userId: AccountRepository.getId(),
				discussionId: id,
			}),
		}

		return fetch(
			BaseRepository.baseUrl + '/discussions/save',
			requestOptions
		).then(BaseRepository.handleError)
	}

	static async isSaved(id) {
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: AccountRepository.getToken(),
			},
			body: JSON.stringify({
				userId: AccountRepository.getId(),
				discussionId: id,
			}),
		}

		return fetch(
			BaseRepository.baseUrl + '/discussions/is-saved',
			requestOptions
		).then(BaseRepository.handleError)
	}

	static async getByUser() {
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: AccountRepository.getToken(),
			},
		}

		return fetch(
			BaseRepository.baseUrl +
				'/discussions/user/' +
				AccountRepository.getId(),
			requestOptions
		).then(BaseRepository.handleError)
	}

	static async getSaved() {
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: AccountRepository.getToken(),
			},
		}

		return fetch(
			BaseRepository.baseUrl +
				'/discussions/user/' +
				AccountRepository.getId() +
				'/saved',
			requestOptions
		).then(BaseRepository.handleError)
	}

	static async getPopular(amount) {
		return fetch(
			BaseRepository.baseUrl + '/discussions/popular/' + amount
		).then(BaseRepository.handleError)
	}
}
