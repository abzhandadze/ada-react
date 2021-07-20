import React from 'react'
import { ConfirmModal } from '../modals/confrimModal/ConfirmModal'

interface ConfirmButtonProps {
    buttonFucntion:         Function
    buttonTitle:            string
    buttonClassname:        string 
    question:               string
}

export const ConfirmButton = ({ buttonFucntion, buttonTitle, buttonClassname, question }: ConfirmButtonProps) => {
    const [confirmModalVisible, setConfirmModalVisible] = React.useState<boolean>(false)

    return (
        <React.Fragment>
            <div className={buttonClassname} onClick={() => setConfirmModalVisible(true)}>{buttonTitle}</div>

            {confirmModalVisible && (
                <ConfirmModal  
                    open={confirmModalVisible}
                    setOpen={setConfirmModalVisible}
                    nextStepFunction={() => buttonFucntion()}
                    question={question}
                />
            )}
        </React.Fragment>
    )
}
