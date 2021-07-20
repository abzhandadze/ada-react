import React from 'react'
// import { Link } from 'react-router-dom'
import { Banner } from '../../../redux/app/ApplicationTypes'

interface MainCarouselBannersProps { mainCarouselBannerData: Banner[] }

export const MainCarouselBanners = ({ mainCarouselBannerData }: MainCarouselBannersProps) => {
    return (
        <React.Fragment>
            {/* <div className="big-sale-box">
                {mainCarouselBannerData.map((banner: Banner, index: number) => (
                    <Link className="big-sale box-anim" to={banner.link} key={index}>
                        <img src={banner.image} alt=""/>
                        <h2>{banner.type}</h2>
                        <h3>{banner.name}</h3>
                        <p>price: {banner.price}</p>
                    </Link>
                ))}
            </div> */}
        </React.Fragment>
    )
}
