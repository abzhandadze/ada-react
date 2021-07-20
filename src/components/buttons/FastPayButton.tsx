import React from 'react'
import { Tooltip } from '@material-ui/core'
import { Product } from '../../redux/product/ProductTypes'
import { useDispatch } from 'react-redux'
import { addToCart, clearCart } from '../../redux/cart/cart-actions'
import { useHistory } from 'react-router'
import Button from '@material-ui/core/Button'

export const FastPayButton = ({ quantityNumber, product }: { quantityNumber: number, product: Product}) => {
    const [open, setOpen] = React.useState(false)

    const dispatch = useDispatch()
    const history = useHistory()

    const redirect = () => {
        history.push('/checkout')
    }

    const fastPay = async (product: Product, quantity: number) => {
        await dispatch(clearCart())
		await dispatch(addToCart(product, quantity))

        redirect()
	}

    const handleTooltipClose = () => {
        setOpen(false)
    }

    const handleTooltipOpen = () => {
        setOpen(true)
    }

    return (
        <React.Fragment>
            {quantityNumber === 0 ? (
                <Tooltip 
                    title="პროდუქტის ყიდვისთვის აუცილებლად უნდა აირჩიოთ სასურველი რაოდენობა." 
                    placement="top" 
                    arrow 
                    onClose={handleTooltipClose} 
                    open={open} 
                >
                        <Button className={"buy-now link disable-btn"} onClick={handleTooltipOpen} >
                            ყიდვა
                        </Button>
                </Tooltip>
            ) : (
                <button className={"buy-now link"} onClick={() => fastPay(product, quantityNumber)}>
                    ყიდვა
                </button>
            )}
        </React.Fragment>
    )
}