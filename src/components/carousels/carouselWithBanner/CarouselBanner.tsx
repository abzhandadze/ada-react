import React from 'react'
import { Link } from 'react-router-dom'
import { BannerData } from '../../../redux/product/ProductTypes'

interface CarouselBannerProps { bannerData: BannerData }

export const CarouselBanner = ({ bannerData }: CarouselBannerProps) => {
    return (
        <React.Fragment>
            <Link className="baner white box-anim" to="/">
                <img src={bannerData.image} alt="baner" />
                <h3>{bannerData.title} </h3>
                <h2>{bannerData.category_title}</h2>
                <p>{bannerData.shipping_title}</p>
            </Link>
        </React.Fragment>
    )
}
