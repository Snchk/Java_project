import React from 'react'
import './Helpers.css'

export default function Back(props) {
	return (
		<button onClick={props.goBack} className='back-button'>
			Back
		</button>
	)
}
