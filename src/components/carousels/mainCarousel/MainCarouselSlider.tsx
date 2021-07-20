import React from 'react'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { MainCarouselItem } from '../../../redux/app/ApplicationTypes'
import '../../../../node_modules/swiper/swiper-bundle.css'

interface MainCarouselSliderProps { mainCarouselSliderData: MainCarouselItem[], mainCarouselSliderClassName: string }

export const MainCarouselSlider = ({ mainCarouselSliderData, mainCarouselSliderClassName }: MainCarouselSliderProps) => {
    SwiperCore.use([Navigation, Pagination, Autoplay])

    const params = {
        loop: true,
        grabCursor: true,
        slidesPerView: 1,
        pagination: {
            el: `.${mainCarouselSliderClassName}-pagination`,
            clickable: true,
        },
    }

    return (
        <React.Fragment>
            <Swiper className={mainCarouselSliderClassName} {...params} autoplay={{ delay: 3000 }}>
                {mainCarouselSliderData.map((carousel: MainCarouselItem, index: number) => {
                    return (
                        <SwiperSlide key={index}>
                            <img src={carousel.image} alt=""/>
                            <h3>{carousel.type}</h3>
                            <h1>{carousel.name}</h1>
                            <h2>{carousel.second_name}</h2>
                            <p>{carousel.text}</p>
                            <Link className="link" to={carousel.link}>
                                {carousel.link_text}
                            </Link>
                        </SwiperSlide>

                    )
                })}

                <div className={`${mainCarouselSliderClassName}-pagination`}></div>
            </Swiper>
        </React.Fragment>
    )
}