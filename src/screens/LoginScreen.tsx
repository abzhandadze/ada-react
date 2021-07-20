import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { Formik } from 'formik'
import { login } from '../redux/authentication/auth-actions'
import { RootState } from '../redux/store'
import * as Yup from 'yup'

export const LoginScreen: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    const history = useHistory()
    const dispatch = useDispatch()

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email('გთხოვთ მიუთითოთ ვალიდური ელ-ფოსტა').required('ელ-ფოსტა აუცილებელი ველია'),
        password: Yup.string()
            .required('პაროლი აუცილებელი ველია')
    })

    if (isAuthenticated) return <Redirect to="/" />

    return (
        <React.Fragment>
            <div className="form-page">
                <h1>ავტორიზაცია</h1>
                
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={LoginSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        dispatch(login(values.email, values.password, history))

                        setSubmitting(false)
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit} id="signin">
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

                            <div className="input-box">
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    placeholder="შეიყვანეთ პაროლი"
                                />
                                {!errors.password && touched.password && (
                                    <i className="fas fa-check done"></i>
                                )}
                                <p className="error-message">
                                    {errors.password && touched.password && errors.password}
                                </p>
                            </div>

                            <div className="btn-agree">
                                <button type="submit" id="submit" disabled={isSubmitting}>შესვლა</button>
                            </div>
                            <button className="social-btn fb-btn"><i className="fab fa-facebook-f"></i> ფეისბუქით ავტორიზაცია</button>
                            <button className="social-btn google-btn"><i className="fab fa-google"></i> გუგლით ავტორიზაცია</button>

                            <Link to="/forgot_password">დაგავიწყდათ პაროლი?</Link>
                            <Link to="/registration">რეგისტრაცია</Link>
                        </form>
                    )}
                </Formik>
            </div>
        </React.Fragment>
    )
}
