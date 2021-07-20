import React from 'react'
import { Tooltip } from '@material-ui/core'
import { Product } from '../../redux/product/ProductTypes'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/cart/cart-actions'
import { CartModal } from '../modals/cartModal/CartModal'
import Button from '@material-ui/core/Button'

export const AddToCartButton = ({ quantityNumber, product }: { quantityNumber: number, product: Product}) => {
    const [cartModalVisible, setCartModalVisible] = React.useState<boolean>(false)

    const dispatch = useDispatch()

    const addToCartItems = async (product: Product, quantity: number) => {
		await dispatch(addToCart(product, quantity))

		setCartModalVisible(true)
	}

    const [open, setOpen] = React.useState(false)

    const handleTooltipClose = () => {
        setOpen(false)
    }

    const handleTooltipOpen = () => {
        setOpen(true)
    }

    return (
        <React.Fragment>
            {quantityNumber === 0 ? (
                <Tooltip title="პროდუქტის კალათაში დამატებისთვის აუცილებლად უნდა აირჩიოთ სასურველი რაოდენობა." placement="top" arrow onClose={handleTooltipClose} open={open} >
                        <Button className={"add link disable-btn"} onClick={handleTooltipOpen} >
                            დაამატე კალათაში
                        </Button>
                </Tooltip>
            ) : (
                <button className={"add link"} onClick={() => addToCartItems(product, quantityNumber)}>
                    დაამატე კალათაში
                </button>
            )}

            {cartModalVisible && <CartModal open={cartModalVisible} setOpen={setCartModalVisible} /> }
        </React.Fragment>
    )
}