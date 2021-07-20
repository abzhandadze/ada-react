import React from 'react'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SmallProductCard } from '../../product/SmallProductCard'
import '../../../../node_modules/swiper/swiper-bundle.css'
import './carouselWithBanner.scss'
import { Product } from '../../../redux/product/ProductTypes'

interface CarouselSliderProps {
    sliderData:             Product[], 
    paginationClassName:    string | undefined, 
    navigationNextName:     string | undefined, 
    navigationPrevName:     string | undefined, 
    sliderName:             string | undefined
}

export const CarouselSlider = (props: CarouselSliderProps) => {
    const { sliderData, paginationClassName, navigationNextName, navigationPrevName, sliderName } = props

    SwiperCore.use([Navigation, Pagination])

    const params = {
        slidesPerColumn: 2,
        spaceBetween: 20,
        pagination: {
            el: `.${paginationClassName}`,
            clickable: true,
        },
        navigation: {
            nextEl: `.${navigationNextName}`,
            prevEl: `.${navigationPrevName}`,
        },
        breakpoints: {
            700: { slidesPerView: 2, slidesPerColumn: 2,},
            801: { slidesPerView: 1, slidesPerColumn: 2,},
            1022: { slidesPerView: 2, slidesPerColumn: 2,},
            1371: { slidesPerView: 3, slidesPerColumn: 2,},
        }
    }

    return (
        <React.Fragment>
            <Swiper className={`top-product-slider ${sliderName}`} {...params}>
                {sliderData.map((product: Product, index: number) => (
                    <SwiperSlide key={index} >
                        <SmallProductCard  product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </React.Fragment>
    )
}