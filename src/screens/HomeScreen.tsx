import React from 'react'
import { useSelector } from 'react-redux'
import { ThreeBannerContainer } from '../components/banners/ThreeBannerContainer'
import { CarouselWithBanner } from '../components/carousels/carouselWithBanner/CarouselWithBanner'
import { VerticalCardsCarousel } from '../components/carousels/verticalCardsCarousel/VerticalCardsCarousel'
import { MainCarousel } from '../components/carousels/mainCarousel/MainCarousel'
import { BrandCarousel } from '../components/carousels/brandCarousel/BrandCarousel'
import { Banner } from '../redux/app/ApplicationTypes'
import { ProductsDepartment } from '../redux/product/ProductTypes'
import { RootState } from '../redux/store'
import { EightItemBlock } from '../components/product/EightItemBlock'

export const HomeScreen: React.FC = () => {
    const { brands, banners, mainCarouselData } = useSelector((state: RootState) => state.app)
    const { departments, lastSeenProducts } = useSelector((state: RootState) => state.products)

    return (
        <React.Fragment>
            <MainCarousel 
                mainCarouselSliderData={mainCarouselData} 
                mainCarouselBannerData={banners.filter((banner: Banner) => banner.banner_priority === "high")} 
            />

            {lastSeenProducts?.length && 
                <VerticalCardsCarousel 
                    sliderData={lastSeenProducts.reverse()} 
                    paginationClassName={'last-seen'} 
                    navigationNextName={`last-seen`} 
                    navigationPrevName={'last-seen'}   
                    sliderName={"last-seen-carousel"} 
                    containerName={"ბოლოს ნანახი პროდუქტები"}  
                /> 
            }

            <ThreeBannerContainer bannersData={banners.filter((banner: Banner) => banner.banner_priority === "medium")} />

            {departments && departments.slice(1, 2).map((department: ProductsDepartment, index: number) => (
                <React.Fragment key={index}>
                    <EightItemBlock sliderData={department.department} />
                </React.Fragment>
            ))}

            {departments && departments.map((department: ProductsDepartment, index: number) => (
                <div key={index}>
                    <CarouselWithBanner 
                        bannerData={department.bannerData} 
                        bannerPosition={department.bannerPosition}
                        sliderData={department.department} 
                        paginationClassName={`${department.carousel_name}-pagination`} 
                        navigationNextName={`${department.carousel_name}-next`} 
                        navigationPrevName={`${department.carousel_name}-prev`} 
                        sliderName={department.department_name} 
                        containerName={department.department_name}
                    />
                </div>
            ))}

            <BrandCarousel carouselData={brands} carouselClassName={"small-slider"}  />
        </React.Fragment>
    )
}