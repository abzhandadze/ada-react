import React from 'react'
import Lottie from 'react-lottie'
import { Link } from 'react-router-dom'
import animationData from '../animations/LoadingAnimation.json'

export const SmallLoadingComponent = () => {
	return (
		<React.Fragment>
			<Link to="/" className="small-loading" >
				<Lottie options={{
					loop: true,
					autoplay: true, 
					animationData: animationData,
					rendererSettings: {
					  	preserveAspectRatio: 'xMidYMid slice'
					}
				}} height={'auto'} width={'350px'} />
			</Link>
		</React.Fragment>
	)
}