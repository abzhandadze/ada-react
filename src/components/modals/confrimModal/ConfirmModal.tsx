import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

interface ConfirmModalProps {
    open:               boolean
    setOpen:            React.Dispatch<React.SetStateAction<boolean>>
    nextStepFunction:   Function
    question:  string
}

export const ConfirmModal = ({ open, setOpen, nextStepFunction, question }: ConfirmModalProps) => {
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">{question}</DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">არა</Button>

                    <Button onClick={() => nextStepFunction()} color="primary">დიახ</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}