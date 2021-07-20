import React from 'react'
import { Formik } from 'formik'
import { useHistory, useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { resetPassword } from '../redux/authentication/auth-actions'
import * as Yup from 'yup'

export const ResetPasswordScreen: React.FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { resettoken }: any = useParams()

    const ResetPasswordSchema = Yup.object().shape({
        newPassword: Yup.string()
            .min(8, 'პაროლი უნდა შედგებოდეს მინიმუმ 8 სიმბოლოსგან')
            .max(20, 'პაროლი უნდა შედგებოდეს მაქსიმუმ 20 სიმბოლოსგან')
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "პაროლი უნდა შედგებოდეს როგორც პატარა ისე დიდი ლათინური ასოებისგან ასევე უნდა შეიცავდეს როგორც რიცხვს ისე სიმბოლოს"
            )
            .required('ახალი პაროლი აუცილებელი ველია'),
        confirmNewPassword: Yup.string().when("newPassword", {
            is: (value: any) => (value && value.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("newPassword")],
                "არ ემთხვევა ზემოთ შეყვანილ პაროლს"
            )
        })
    })
     
    return (
        <React.Fragment>
            <div className="form-page">
                <img src="/images/reset-password-bg.svg" alt="" className="form-img"/>
                <h1>პაროლის აღდგენა</h1>

                <Formik
                    initialValues={{ oldPassword: '', newPassword: '', confirmNewPassword: '' }}
                    validationSchema={ResetPasswordSchema}
                    onSubmit={(values: any, { setSubmitting }) => {
                        dispatch(resetPassword(values.newPassword, history, resettoken))

                        setSubmitting(false)
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit}  id="signup">
                            <div className="input-box">
                                <input
                                    type="password"
                                    name="newPassword"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.newPassword}
                                    placeholder="შეიყვანეთ ახალი პაროლი"
                                />

                                {!errors.newPassword && touched.newPassword && (
                                    <i className="fas fa-check done"></i>
                                )}

                                <p className="error-message">
                                    {errors.newPassword && touched.newPassword && errors.newPassword}
                                </p>
                            </div>

                            <div className="input-box">
                                <input
                                    type="password"
                                    name="confirmNewPassword"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.confirmNewPassword}
                                    placeholder="დაადასტურეთ პაროლი"
                                    disabled={errors.confrimPassword && touched.password && values.password.length}
                                />

                                {!errors.confirmNewPassword && touched.confirmNewPassword && values.newPassword.length && values.newPassword === values.confirmNewPassword ? (
                                    <i className="fas fa-check done"></i>
                                ): null}

                                <p className="error-message">
                                    {touched.confirmNewPassword && errors.confirmNewPassword && errors.confirmNewPassword}
                                </p>
                            </div>

                            <div className="btn-agree">
                                <button type="submit" id="submit" disabled={isSubmitting || values.newPassword !== values.confirmNewPassword}>
                                    აღდგენა
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </React.Fragment>
    )
}
