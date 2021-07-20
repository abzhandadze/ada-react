import React from 'react'
import { MainCarouselBanners } from './MainCarouselBanners'
import { MainCarouselSlider } from './MainCarouselSlider'
import { Menu } from '../../menu/Menu'
import { Banner, MainCarouselItem } from '../../../redux/app/ApplicationTypes'
import './mainCarousel.scss'

interface MainCarouselProps { mainCarouselSliderData: MainCarouselItem[], mainCarouselBannerData: Banner[] }

export const MainCarousel = ({ mainCarouselSliderData, mainCarouselBannerData }: MainCarouselProps) => {
    return (
        <React.Fragment>
            <div className="main-carousel-section">
                <Menu />
                <MainCarouselSlider mainCarouselSliderData={mainCarouselSliderData} mainCarouselSliderClassName={"main-carousel-slider"} />
                <MainCarouselBanners mainCarouselBannerData={mainCarouselBannerData} />
            </div>
        </React.Fragment>
    )
}
