import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { registration } from '../redux/authentication/auth-actions'
import { RootState } from '../redux/store'

export const RegistrationScreen: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

    const dispatch = useDispatch()
    const history = useHistory()

    const RegistrationSchema = Yup.object().shape({
        name: Yup.string()
            .min(4, 'სახელი უნდა შედგებოდეს მინიმუმ 4 სიმბოლოსგან')
            .max(15, 'სახელი უნდა შედგებოდეს მაქსიმუმ 25 სიმბოლოსგან')
            .required('სახელი აუცილებელი ველია'),
        email: Yup.string()
            .matches(
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                "გთხოვთ მიუთითოთ ვალიდური ელ-ფოსტა"
            )
            .required('ელ-ფოსტა აუცილებელი ველია'),
        password: Yup.string()
            .min(8, 'პაროლი უნდა შედგებოდეს მინიმუმ 8 სიმბოლოსგან')
            .max(20, 'პაროლი უნდა შედგებოდეს მაქსიმუმ 20 სიმბოლოსგან')
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "პაროლი უნდა შედგებოდეს როგორც პატარა ისე დიდი ლათინური ასოებისგან ასევე უნდა შეიცავდეს როგორც რიცხვს ისე სიმბოლოს"
            )
            .required('პაროლი აუცილებელი ველია'),
        confirmPassword: Yup.string().when("password", {
            is: (value: any) => (value && value.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("password")],
                "არ ემთხვევა ზემოთ შეყვანილ პაროლს"
            )
        })
    })

    if (isAuthenticated) return <Redirect to="/" />

    return (
        <React.Fragment>
            <div className="form-page">
                <h1>რეგისტრაცია</h1>

                <Formik
                    initialValues={{ name: '', email: '', password: '', confirmPassword: ''}}
                    validationSchema={RegistrationSchema}
                    onSubmit={(values: any, { setSubmitting }) => {
                        dispatch(registration(values.name, values.email, values.password, history))

                        setSubmitting(false)
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit} id="signup">
                            <div className="input-box">
                                <input 
                                    type="text" 
                                    name="name" 
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name} 
                                    placeholder="შეიყვანეთ სახელი"
                                />
                                {!errors.name && touched.name && (
                                    <i className="fas fa-check done"></i>
                                )}
                                <p className="error-message">
                                    {errors.name && touched.name && errors.name}
                                </p>
                            </div>

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

                            <div className="input-box">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.confirmPassword}
                                    placeholder="დაადასტურეთ პაროლი"
                                    disabled={errors.confrimPassword && touched.password && values.password.length}
                                />
                                {!errors.confirmPassword && touched.confirmPassword && values.password.length && values.password === values.confirmPassword ?(
                                    <i className="fas fa-check done"></i>
                                ): null}
                                <p className="error-message">
                                    {touched.confirmPassword && errors.confirmPassword && errors.confirmPassword}
                                </p>
                            </div>

                            <div className="btn-agree">
                                <button type="submit" id="submit" disabled={isSubmitting || values.password !== values.confirmPassword}>რეგისტრაცია</button>
                            </div>
                            <button className="social-btn fb-btn"><i className="fab fa-facebook-f"></i> ფეისბუქით ავტორიზაცია</button>
                            <button className="social-btn google-btn"><i className="fab fa-google"></i> გუგლით ავტორიზაცია</button>

                            <Link to="/login">ავტორიცაზია</Link>
                        </form>
                    )}
                </Formik>
            </div>
        </React.Fragment>
    )
}
