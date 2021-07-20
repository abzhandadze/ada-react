import React from 'react'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Brand } from '../../../redux/app/ApplicationTypes'
import '../../../../node_modules/swiper/swiper-bundle.css'
import "./brandCarousel.scss"

interface BrandCarouselProps { carouselData: Brand[], carouselClassName: string }

export const BrandCarousel = ({ carouselData, carouselClassName }: BrandCarouselProps) => {
    SwiperCore.use([ Navigation, Pagination, Scrollbar, A11y ])

    const params = { navigation: { nextEl: '.next', prevEl: '.prev' } }

    return (
        <React.Fragment>
            <div className={carouselClassName + '-box'}>
                <h2>Brands</h2>

                <Swiper 
                    className={carouselClassName}
                    {...params}
                    spaceBetween={50}
                    slidesPerView={'auto'}
                >
                    {carouselData.map((brand: Brand, index: number) => (
                        <SwiperSlide key={index}>
                            <Link to={`/brands/${brand.name}`}>
                                <img src={brand.link} alt="brand "/>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </React.Fragment>
    )
}
