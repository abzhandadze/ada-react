import React from 'react'
import { Link } from 'react-router-dom'
import { Banner } from '../../redux/app/ApplicationTypes'
import './threeBannerContainer.scss'

interface ThreeBannerContainerProps { bannersData: Banner[] }

export const ThreeBannerContainer = ({ bannersData }: ThreeBannerContainerProps) => {
    return (
        <React.Fragment>
            <div className="three-baner-box">   
                {bannersData.map((banner: Banner, index: number) => (
                        <Link className="baner box-anim" key={index} to={banner.link} > 
                            <img src={banner.image} alt="free" />
                            <h3>{banner.type}</h3>
                            <h2>{banner.name}</h2>
                            <p>Price: {banner.price}</p>
                            <span>{banner.text} </span>
                        </Link>
                ))}
            </div>
        </React.Fragment>
    )
}
