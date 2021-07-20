import React from 'react'
import { BannerData, Product } from '../../../redux/product/ProductTypes'
import { CarouselBanner } from './CarouselBanner'
import { CarouselSlider } from './CarouselSlider'

interface CarouselWithBannerProps {
    bannerData?: BannerData
    sliderData: Product[]
    paginationClassName: string | undefined
    navigationNextName: string | undefined
    navigationPrevName: string | undefined
    sliderName: string | undefined
    containerName: string | undefined
    bannerPosition?: string | undefined
}

export const CarouselWithBanner = (props: CarouselWithBannerProps) => {
    const { 
        bannerData, sliderData, paginationClassName, navigationNextName,
        sliderName, containerName, bannerPosition, navigationPrevName
    } = props

    let mainContainerClassName = bannerPosition && bannerPosition === "left" ? "carousel-with-banner reverse" : "carousel-with-banner"

    return (
        <React.Fragment>
            <div className={mainContainerClassName}>
                <div className={`pagination ${paginationClassName}`}></div>
                <div className="top"> 
                    <h1>{containerName}</h1>
                    <div className="line"></div>
                    <div className="slider-btns"> 
                        <div className={navigationPrevName}>
                            <i className="fas fa-chevron-left"></i>
                        </div>
                        
                        <div className={navigationNextName}>
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    </div>
                </div>

                <div className="middle">
                    { bannerData && <CarouselBanner bannerData={bannerData} /> }
                    
                    <CarouselSlider 
                        sliderData={sliderData}
                        paginationClassName={paginationClassName}
                        navigationNextName={navigationNextName}
                        navigationPrevName={navigationPrevName}
                        sliderName={sliderName}
                    />
                </div>
            </div>
        </React.Fragment>
    )
}
