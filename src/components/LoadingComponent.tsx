import React from 'react'
import Lottie from 'react-lottie'
import animationData from '../animations/LoadingAnimation.json'

export const LoadingComponent = () => {
	return (
		<React.Fragment>
			<div style={{
				background:'#fff',
				position: 'fixed',
				top: '0',
				left: '0',
				height:'100vh',
				width: '100vw',
				zIndex: 999,
				display:'flex',
				alignItems: 'center',
				justifyContent: 'center',
				paddingBottom: '50px',
				overflow: 'hidden',
			}}>
				<Lottie options={{
					loop: true,
					autoplay: true,
					animationData: animationData,
					rendererSettings: {
					  	preserveAspectRatio: 'xMidYMid slice'
					}
				}} height={'auto'} width={'350px'} />
			</div>
		</React.Fragment>
	)
}