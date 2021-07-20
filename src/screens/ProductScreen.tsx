import React from 'react'
import axios, { AxiosResponse } from 'axios'
import { toastr } from 'react-redux-toastr'
import { useParams } from 'react-router'
import { ProductFilter } from '../components/product/ProductFilter'
import { ProductList } from '../components/product/ProductList'
import { environment } from '../environment/environment'
import { Product } from '../redux/product/ProductTypes'
import { SmallLoadingComponent } from '../components/SmallLoadingComponent'
import { QueryOptions } from '../helpers/query.options'

export const ProductScreen: React.FC = () => {
    const [products, setProducts] = React.useState<Product[]>([])
    const [pageLoading, setPageLoading] = React.useState<Boolean>(false)
    const [productQuery, setProductQuery] = React.useState<string>('')

    interface ParamTypes { section: string, category: string, subcategory: string }

    const { section, category, subcategory } = useParams<ParamTypes>()

    React.useEffect(() => {
        setPageLoading(true)

        const options = new QueryOptions()

        options.page = 1
        options.limit = 25
        if (section) options.product_section = String(section)
        if (category) options.product_category = String(category)
        if (subcategory) options.product_sub_category = String(subcategory)
        
		axios
            .get(environment.apiBaseURL + '/products?' + options.toQueryString() + productQuery)
            .then(async (response: AxiosResponse) => {
                setProducts(response.data.data)

                setPageLoading(false)
            })
            .catch(() => {
                toastr.error("დაფიქსირდა შეცდომა", "სერვისი დროებით მიუწვდომელია")
            })
    }, [productQuery, category, section, subcategory])

    return (
        <React.Fragment>
            <main>
                <div className="product product-lf">
                    <div className="product-filter">
                        <ProductFilter 
                            productQuery={productQuery}
                            setProductQuery={setProductQuery} 
                            sectionId={section} 
                            categoryId={category} 
                            subCategoryId={subcategory} 
                        />
                    </div>
                    {pageLoading ? <SmallLoadingComponent /> : <ProductList products={products} /> }
                </div>
            </main>
        </React.Fragment>
    )
}