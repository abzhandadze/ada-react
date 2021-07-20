import React from 'react'
import { Product } from '../../redux/product/ProductTypes'
import { ProductCard } from './ProductCard'
import '../../stylesheet/eight-item-block.scss'

export const EightItemBlock = ({ sliderData }: { sliderData: Product[]}) => {

    return (
        <React.Fragment>
            <div className="eight-item-block" >
                {sliderData.slice(0, 9).map((product: Product, index: number) => (
                    <React.Fragment key={index}>
                        <ProductCard product={product} key="index" />
                    </React.Fragment>
                ))}
            </div>
        </React.Fragment>
    )
}