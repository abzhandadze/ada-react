import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { useHistory } from 'react-router'

export const CartModal = ({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const cartItemsLength = useSelector((state: RootState) => state.cart.cartItems).length

    const history = useHistory()
  
    const handleClose = async (inCart: boolean) => {
        await setOpen(false)

        if (inCart) history.push('/cart')
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={() => handleClose(false)}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {`პროდუქტი კალათაში წარმატებით დაემატა, თქვენ ამჟამად კალათაში გაქვთ ${cartItemsLength} ნივთი`}
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => handleClose(true)} color="primary">
                        კალათის ნახვა
                    </Button>

                    <Button onClick={() => handleClose(false)} color="primary">
                        გაგრძელება
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}