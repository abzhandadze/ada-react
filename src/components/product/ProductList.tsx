import React from 'react'
import { Product } from '../../redux/product/ProductTypes'
import { ProductCard } from './ProductCard'

export const ProductList = ({ products }: { products: Product[]}) => {
    return (
        <React.Fragment>
            <div className="product-list">
                <div className="product-list-box">
                    {products.map((product: Product, index: number) => (
                        <React.Fragment key={index}>
                            <ProductCard product={product} />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </React.Fragment>
    )
}