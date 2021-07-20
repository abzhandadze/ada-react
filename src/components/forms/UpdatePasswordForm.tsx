import React from 'react'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { updatePassword } from '../../redux/authentication/auth-actions'
import * as Yup from 'yup'

export const UpdatePasswordForm: React.FC = () => {
    const dispatch = useDispatch()

    const UpdatePasswordSchema = Yup.object().shape({
        currentPassword: Yup.string()
            .required('ძველი პაროლი აუცილებელი ველია'),
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
            <Formik
                initialValues={{ currentPassword: '', newPassword: '', confirmNewPassword: '' }}
                validationSchema={UpdatePasswordSchema}
                onSubmit={(values: any, { setSubmitting }) => {
                    dispatch(updatePassword(values.currentPassword, values.newPassword))
                    setSubmitting(false)
                }}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}  id="updatePassword">
                        <div className="input-box">
                            <input
                                type="password"
                                name="currentPassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.currentPassword}
                                placeholder="შეიყვანეთ ამჟამინდელი პაროლი"
                            />

                            {!errors.currentPassword && touched.currentPassword && (
                                <i className="fas fa-check done"></i>
                            )}

                            <p className="error-message">
                                {errors.currentPassword && touched.currentPassword && errors.currentPassword}
                            </p>
                        </div>

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
                                placeholder="დაადასტურეთ ახალი პაროლი"
                                disabled={errors.confrimPassword && touched.newPassword && values.newPassword.length}
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
                                პაროლის შეცვლა
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </React.Fragment>
    )
}