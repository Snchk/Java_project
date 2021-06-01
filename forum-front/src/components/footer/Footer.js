import React from 'react'
import { Nav } from 'react-bootstrap'
import './Footer.css'

export default class Footer extends React.Component {
	render() {
		return (
			<div className='footer'>
				<div className='container row footer-container'>
					<div className='col-md-4'>
						<h5>Instagram</h5>
						<Nav>
							<Nav.Link href='https://www.instagram.com/'>
								Author 1
							</Nav.Link>
							<Nav.Link href='https://www.instagram.com/'>
								Author 2
							</Nav.Link>
							<Nav.Link href='https://www.instagram.com/'>
								Author 3
							</Nav.Link>
						</Nav>
					</div>
					<div className='col-md-4'>
						<h5>Telegram</h5>
						<Nav>
							<Nav.Link href='https://web.telegram.org/'>
								Author 1
							</Nav.Link>
							<Nav.Link href='https://web.telegram.org/'>
								Author 2
							</Nav.Link>
							<Nav.Link href='https://web.telegram.org/'>
								Author 3
							</Nav.Link>
						</Nav>
					</div>
					<div className='col-md-4'>
						<h5>Discord</h5>
						<Nav>
							<Nav.Link href='https://discord.com/'>Author 1</Nav.Link>
							<Nav.Link href='https://discord.com/'>Author 2</Nav.Link>
							<Nav.Link href='https://discord.com/'>Author 3</Nav.Link>
						</Nav>
					</div>
				</div>
			</div>
		)
	}
}
