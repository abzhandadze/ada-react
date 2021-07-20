import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Formik } from 'formik'
import { forgotPassword } from '../redux/authentication/auth-actions'
import * as Yup from 'yup'

export const ForgotPasswordScreen: React.FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const ForgotPasswordSchema = Yup.object().shape({
        email: Yup.string()
            .email('გთხოვთ მიუთითოთ ვალიდური ელ-ფოსტა')
            .required('ელ-ფოსტა აუცილებელი ველია')
    })

    return (
        <React.Fragment>
             <div className="form-page">
                <img src="./images/forgot-password-bg.svg" alt="" className="form-img" />
                <h1>პაროლის აღდგენა</h1>

                <Formik
                    initialValues={{ email: '' }}
                    validationSchema={ForgotPasswordSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        dispatch(forgotPassword(values.email, history))

                        setSubmitting(false)
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit} id="signup">
                            <div className="input-box">
                                <input 
                                    type="mail" 
                                    name="email" 
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email} 
                                    placeholder="შეიყვანეთ ელ-ფოსტა"
                                />

                                {!errors.email && touched.email && (
                                    <i className="fas fa-check done"></i>
                                )}

                                <p className="error-message">
                                    {errors.email && touched.email && errors.email}
                                </p>
                            </div>
                    

                            <div className="btn-agree">
                                <button type="submit" id="submit" disabled={isSubmitting}>აღდგენა</button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </React.Fragment>
    )
}
