import React from 'react'
import { useDispatch } from 'react-redux'
import { changeCartQuantity } from '../../redux/cart/cart-actions'

interface ProductQuantityProps {
    productId:          string
    productQuantity:    number, 
    quantityNumber:     number, 
    setQuantityNumber:  React.Dispatch<React.SetStateAction<number>>
}

export const ProductQuantity = ({ productId, productQuantity, setQuantityNumber, quantityNumber }: ProductQuantityProps) => {
    const dispatch = useDispatch()

    const changeQuantity = (value: number) => {
        if (value <= productQuantity && value > 0) {
            setQuantityNumber(value)
            dispatch(changeCartQuantity(productId, value))
        }
    }

    return (
        <React.Fragment>
            <div className="spinner">
                <button className="minus" type="button" onClick={() => changeQuantity(quantityNumber - 1)}>-</button>

                <input
                    type="number"
                    value={quantityNumber}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeQuantity(Number(event.target.value))} 
                />

                <button className="plus" type="button" onClick={() => changeQuantity(quantityNumber + 1)}>+</button>
            </div>
        </React.Fragment>
    )
}