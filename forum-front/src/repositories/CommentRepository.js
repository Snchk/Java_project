import AccountRepository from './AccountRepository'
import BaseRepository from './BaseRepository'

export default class CommentRepository {
	static async getByDiscussionId(id) {
		return fetch(BaseRepository.baseUrl + '/comments/discussion/' + id).then(
			BaseRepository.handleError
		)
	}

	static async createComment(discussionId, text) {
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: AccountRepository.getToken(),
			},
			body: JSON.stringify({
				authorId: AccountRepository.getId(),
				discussionId: discussionId,
				text: text
			}),
		}

		return fetch(BaseRepository.baseUrl + '/comments', requestOptions).then(
			BaseRepository.handleError
		)
	}

	static async getAll(){
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': AccountRepository.getToken(),
			}
		}

		return fetch(BaseRepository.baseUrl + '/comments', requestOptions).then(
			BaseRepository.handleError
		)
	}

	static async deleteComment(id){
		const requestOptions = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: AccountRepository.getToken(),
			},
		}

		return fetch(
			BaseRepository.baseUrl + '/comments/' + id,
			requestOptions
		).then(BaseRepository.handleError)
	}

	static async updateComment(id, newText){
		const requestOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: AccountRepository.getToken(),
			},
			body: JSON.stringify({
				id: id,
				text: newText,
			}),
		}

		return fetch(BaseRepository.baseUrl + '/comments', requestOptions).then(
			BaseRepository.handleError
		)
	}
}
