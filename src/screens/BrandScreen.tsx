import React from 'react'
import { useDispatch } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { useParams } from 'react-router-dom'
import { ProductCard } from '../components/product/ProductCard'
import { SmallLoadingComponent } from '../components/SmallLoadingComponent'
import { environment } from '../environment/environment'
import { Product } from '../redux/product/ProductTypes'
import axios, { AxiosResponse } from 'axios'
import '../stylesheet/productItem.scss'

export const BrandScreen = () => {
    const [brandProductsData, setBrandProductsData] = React.useState<Product[]>([])
    const [pageLoading, setPageLoading] = React.useState<Boolean>(true)

    const dispatch = useDispatch()

    interface ParamTypes { brandName: string }
    const { brandName } = useParams<ParamTypes>()

    React.useEffect(() => {
		axios
			.get(environment.apiBaseURL + `/products?brand=${brandName}`)
			.then(async (response: AxiosResponse) => {
				setBrandProductsData(response.data.data)
				setPageLoading(false)
			})
			.catch(() => {
				toastr.error("დაფიქსირდა შეცდომა", "სერვისი დროებით მიუწვდომელია")
			})
	}, [dispatch, brandName])
    
    return (
        <React.Fragment>
            {pageLoading ? (
                <SmallLoadingComponent />
            ) : (
                <main>
                    <div className="product brand-page">
                        <div className="brand-page-baner">
                            <img src="https://images.squarespace-cdn.com/content/v1/5b5c75daaa49a1a13621c537/1574516301510-L79STADBR6QPT1EAHTZT/ke17ZwdGBToddI8pDm48kNrGXPHJzGoZdSsTa5M52tV7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0lzvxLShT-nUZV5C-FLh_H32uH6Nn8SEt1OoXpl9fCmRXHTWKyfiANCxRi_ROQzZOg/Samsung+Baner.png?format=2500w" alt="" />
                            <h1>{brandName.toUpperCase()}</h1>
                        </div>

                        {brandProductsData?.length ? (
                            <div className="product-list-box">
                                {brandProductsData.map((product: Product, index: number) => (
                                    <ProductCard  product={product} key={index} />
                                ))}
                            </div>
                        ) : (
                            <div className="empty-brand">
                                <h1 style={{ marginTop: '50px' }}>ბრენდის პროდუქტები ვერ მოიძებნა</h1>
                            </div>
                        )}
                    </div>
                </main>
            )}
        </React.Fragment>
    )
}