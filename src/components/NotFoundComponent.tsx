import React from 'react'
import Lottie from 'react-lottie'
import { Link } from 'react-router-dom'
import animationData from '../animations/NotFoundAnimation.json'

export const NotFoundComponent = () => {
	return (
		<React.Fragment>
			<Link to="/" className="page404" >
				<Lottie options={{
					loop: true,
					autoplay: true, 
					animationData: animationData,
					rendererSettings: {
					  	preserveAspectRatio: 'xMidYMid slice'
					}
				}} height={'auto'} width={'auto'} />
			</Link>
		</React.Fragment>
	)
}