import React from 'react'
import AccountRepository from '../../../repositories/AccountRepository'
import CommentRepository from '../../../repositories/CommentRepository'
import Back from '../../helpers/Back'
import AdminComment from './AdminComment'
import './AdminComments.css'
import './../Admin.css'

export default class AdminComments extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoaded: false,
			error: null,
			isAdmin: false,
			comments: [],
		}

        this.onDeleteComment = this.onDeleteComment.bind(this)
	}

	componentDidMount() {
		AccountRepository.isAdmin()
			.then(() => {
				this.state.isAdmin = true
				CommentRepository.getAll()
					.then(result => {
						this.setState({
							isLoaded: true,
							comments: result,
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

    onDeleteComment(index){
        this.state.comments.splice(index, 1)
        this.setState({})
    }

	render() {
		const { isLoaded, isAdmin, comments } = this.state
		if (!isLoaded) return <div>Loading...</div>
		else if (!isAdmin)
			return (
				<div className='admin-container'>
					<h1>Sorry, this page is restricted for you</h1>
					<h4>Login as admin to get access</h4>
					<Back goBack={() => this.props.history.goBack()} />
				</div>
			)

		let domComments = []

		for (let i = 0; i < comments.length; i++) {
            domComments.push(
					<AdminComment
						comment={comments[i]}
						key={comments[i].id}
						index={i}
                        onDelete={this.onDeleteComment}
					/>
				)
        }

		return (
			<div className='container admin-container'>
				{comments.length > 0 ? (
					<div>
						<h5>All comments:</h5>
						<table className='comments-table'>
							<thead>
								<tr>
									<td>ID</td>
									<td>Author</td>
									<td>Discussion</td>
									<td>Date</td>
									<td>Text</td>
									<td>Delete</td>
								</tr>
							</thead>
							<tbody>{domComments}</tbody>
						</table>
					</div>
				) : (
					<div>Nothing to manage :)</div>
				)}
			</div>
		)
	}
}
