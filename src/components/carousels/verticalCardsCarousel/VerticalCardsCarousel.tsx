import React from 'react'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SmallProductCard } from '../../product/SmallProductCard'
import '../../../../node_modules/swiper/swiper-bundle.css'
import '../carouselWithBanner/carouselWithBanner.scss'
import { Product } from '../../../redux/product/ProductTypes'

interface VerticalCarouselProps {
    sliderData:             Product[], 
    paginationClassName:    string, 
    navigationNextName:     string, 
    navigationPrevName:     string, 
    sliderName:             string,
    containerName:          string
}

export const VerticalCardsCarousel = (props: VerticalCarouselProps) => {
    const { sliderData, paginationClassName, navigationNextName, navigationPrevName, sliderName, containerName } = props

    SwiperCore.use([Navigation, Pagination])

    const params = {
        spaceBetween: 20,
        pagination: {
            el: `.${paginationClassName}`,
            clickable: true,
        },
        navigation: {
            nextEl: `.${navigationNextName}-next`,
            prevEl: `.${navigationPrevName}-prev`,
        },
        breakpoints: {
            500: { slidesPerView: 2 },
            801: { slidesPerView: 3 },
            900: { slidesPerView: 4 },
            1150: { slidesPerView: 5 },
            1371: { slidesPerView: 6 }
        }
    }

    return (
        <React.Fragment>
            <div>
                <div className="carousel-with-banner">
                    <div className="top"> 
                        <h1>{containerName}</h1>
                        <div className="line"></div>
                        <div className="slider-btns"> 
                            <div className={`${navigationPrevName}-prev`}>
                                <i className="fas fa-chevron-left"></i>
                            </div>
                            
                            <div className={`${navigationNextName}-next`}>
                                <i className="fas fa-chevron-right"></i>
                            </div>
                        </div>
                    </div>

                    <div className="middle vertical-middle">
                        <Swiper className={`top-product-slider liked-product-slider ${sliderName}`} {...params}>
                            {sliderData.map((product: Product, index: number) => (
                                <SwiperSlide key={index}>
                                    <SmallProductCard product={product} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}