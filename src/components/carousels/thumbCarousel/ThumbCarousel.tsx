import React, { useState } from 'react'
import { environment } from '../../../environment/environment'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Product } from '../../../redux/product/ProductTypes'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Thumbs } from 'swiper'
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox'
import '../../../../node_modules/swiper/swiper-bundle.css'

interface ThumbSliderProps { product: Product }

export const ThumbSliderModal = ({ product }: ThumbSliderProps) => {
	const [sliderIndex, setsliderIndex] = React.useState(0)

    React.useEffect(() => {
        setsliderIndex(sliderIndex)
	}, [sliderIndex])

    

    const showLightBox = (index: number) => {
        const lightitem =  document.querySelectorAll(`.lightItem`)[index]
        const allLightItem =  document.querySelectorAll(`.lightItem`)

        allLightItem.forEach.call(allLightItem, function(el) {
            el.classList.remove("active")
        })
        
        lightitem.classList.add("active")
    }

    SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Thumbs])
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)

    const params = { 
        navigation: { nextEl: '.quick-next', prevEl: '.quick-prev' }, 
        spaceBetween: 10,
        breakpoints: {
            300: { slidesPerView: 2 },
            600: { slidesPerView: 3 },
            1000: { slidesPerView: 4 },
        }
    }

    return (
        <React.Fragment>
            <div className="left" > 
                <figure > 
                    <SimpleReactLightbox >
                        <Swiper thumbs={{ swiper: thumbsSwiper }} className={"big-slider"} onSlideChange={(swiper) => showLightBox(swiper.realIndex)} >
                            {product.thumbs && product.thumbs.map((thumb: string, index: number) => (
                                <SwiperSlide key={index}>
                                    <img src={environment.thumbBaseURL + thumb} alt=""  />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="light-box" id="lightBox">
                            <i className="fas fa-search-plus"></i>
                            <SRLWrapper>
                                {product.thumbs && product.thumbs.map((thumb: string, index: number) => (
                                    <a href={ environment.thumbBaseURL + thumb } className={`lightItem active`} key={index} >
                                        <img src={environment.thumbBaseURL + thumb || "/images/productdefault.png"} alt=""/>
                                    </a>
                                ))}
                            </SRLWrapper>
                        </div>
                    </SimpleReactLightbox>
                </figure>

                <Swiper className={"swiper-container quick-slider"} {...params} onSwiper={setThumbsSwiper} watchSlidesVisibility watchSlidesProgress>
                    {product.thumbs && product.thumbs.map((thumb: string, index: number) => (
                        <SwiperSlide key={index} onClick={() => setsliderIndex(index)} >
                            <img src={environment.thumbBaseURL + thumb} alt=""/>
                        </SwiperSlide>
                    ))}
                    
                    <div className={`quick-prev ${product.thumbs.length <= 4 ? 'hide' : 'show'}`} ><i className="fas fa-arrow-left"></i></div>
                    <div className={`quick-next ${product.thumbs.length <= 4 ? 'hide' : 'show'}`}><i className="fas fa-arrow-right"></i></div>
                </Swiper>
            </div>
        </React.Fragment>
    )
}