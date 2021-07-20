import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import { Link, useHistory  } from 'react-router-dom'
import { RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { Cart } from '../redux/cart/CartTypes'
import { environment } from '../environment/environment'
import { Formik, FormikValues } from 'formik'
import { saveShippingInformation } from '../redux/shipping/shipping-actions'
import { ShippingInformation } from '../redux/shipping/ShippingTypes'
import { createOrder } from '../redux/order/order-actions'
import { Order } from '../redux/order/OrderTypes'
import Grid from '@material-ui/core/Grid'
import * as Yup from 'yup'
import '../stylesheet/checkout.scss'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        }
    })
)

export const CheckoutScreen = () => {
    const [totalPrice, setTotalPrice] = React.useState(0)
    const [totalCartPrice, setCartTotalPrice] = React.useState(0)
    const [shippingPrice, setShippingPrice] = React.useState(0)
    const [city, setCity] = React.useState<string>("თბილისი")

    const cartItems = useSelector((state: RootState) => state.cart.cartItems)
    const authUser = useSelector((state: RootState) => state.auth.user)
    const shippingInformation = useSelector((state: RootState) => state.shipping.shippingInformation)

    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()

    const handleChangeSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCity(event.target.value as string)
    }

    React.useEffect(() => {
        setShippingPrice(3)

        setCartTotalPrice(
            cartItems.reduce((acc: any, cart: Cart) => acc + cart.quantity * cart.amount, 0).toFixed(2)
        )

        setTotalPrice(
            (cartItems.reduce((acc: any, cart: Cart) => acc + cart.quantity * cart.amount, 0) + shippingPrice).toFixed(2)
        )
    }, [cartItems, shippingPrice])

    const CheckoutSchema = Yup.object().shape({
        first_name: Yup.string()
            .min(4, 'სახელი უნდა შედგებოდეს მინიმუმ 4 სიმბოლოსგან')
            .max(15, 'სახელი უნდა შედგებოდეს მაქსიმუმ 25 სიმბოლოსგან')
            .required('სახელი აუცილებელი ველია'),
        last_name: Yup.string()
            .min(4, 'სახელი უნდა შედგებოდეს მინიმუმ 4 სიმბოლოსგან')
            .max(30, 'სახელი უნდა შედგებოდეს მაქსიმუმ 25 სიმბოლოსგან')
            .required('სახელი აუცილებელი ველია'),
        phone: Yup.string()
            .min(9, 'გთხოვთ მიუთითოთ ვალიდური ტელეფონის ნომერი')
            .max(9, 'გთხოვთ მიუთითოთ ვალიდური ტელეფონის ნომერი')
            .required('ტელეფონი აუცილებელი ველია'),
        personal_id: Yup.string()
            .min(11, 'გთხოვთ მიუთითოთ ვალიდური პირადი ნომერი')
            .max(11, 'გთხოვთ მიუთითოთ ვალიდური პირადი ნომერი')
            .required('პირადი ნომერი აუცილებელი ველია'),
        email: Yup.string()
            .matches(
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                "გთხოვთ მიუთითოთ ვალიდური ელ-ფოსტა"
            )
            .required('ელ-ფოსტა აუცილებელი ველია'),
        shipping_address: Yup.string()
            .required('მიწოდების მისამართი აუცილებელი ველია')
    })

    return (
        <React.Fragment>
            <div className={`checkout-box ${classes.root}`}>
                <Grid container item  xs={12} justify="space-between">
                    <Grid container item  className="form-side" sm={12} md={8}>
                        <div className="form-side-box">
                            {authUser?.email && (
                                <Formik
                                    initialValues={{ 
                                        first_name: shippingInformation && shippingInformation.first_name ? shippingInformation.first_name  : '', 
                                        last_name: shippingInformation && shippingInformation.last_name ? shippingInformation.last_name  : '', 
                                        phone: shippingInformation && shippingInformation.phone ? shippingInformation.phone  : '', 
                                        personal_id: shippingInformation && shippingInformation.personal_id ? shippingInformation.personal_id  : '', 
                                        email: authUser.email, 
                                        shipping_address: shippingInformation && shippingInformation.shipping_address ? shippingInformation.shipping_address  : '', 
                                    }}
                                    validationSchema={CheckoutSchema}
                                    onSubmit={async (values: FormikValues, { setSubmitting }) => {
                                        let shippingInfoForAction: ShippingInformation = {
                                            first_name: values.first_name,
                                            last_name: values.last_name,
                                            phone: values.phone,
                                            personal_id: values.personal_id,
                                            email: values.email,
                                            city: city,
                                            shipping_address: values.shipping_address
                                        }

                                        let order: Order = {
                                            user: authUser._id,
                                            order_items: cartItems,
                                            shipping_address: shippingInformation ? shippingInformation : {
                                                first_name: values.first_name,
                                                last_name: values.last_name,
                                                phone: values.phone,
                                                personal_id: values.personal_id,
                                                email: authUser.email, 
                                                shipping_address: values.shipping_address
                                            },
                                            payment_method: "PAYMENT CARD",
                                            shipping_price: shippingPrice,
                                            total_price: totalPrice
                                        }

                                        await dispatch(saveShippingInformation(shippingInfoForAction))

                                        await dispatch(createOrder(order, history))

                                        setSubmitting(false)
                                    }}
                                >
                                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                                        <form className={classes.root} onSubmit={handleSubmit}>
                                            <h2>პირადი იმფორმაცია</h2>
                                            
                                            <Grid container item spacing={4} justify="flex-end"  xs={12}>
                                                <Grid  item className={"gridBox"}  xs={12} sm={6}>
                                                    <TextField 
                                                        id="outlined-basic" 
                                                        className={"inputBox"} 
                                                        label="სახელი" 
                                                        error={errors.first_name && touched.first_name ? true : false}
                                                        helperText={errors.first_name && touched.first_name && errors.first_name}
                                                        variant="outlined"
                                                        type="text" 
                                                        name="first_name" 
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.first_name}
                                                    />
                                                </Grid>

                                                <Grid  item className={"gridBox"}  xs={12} sm={6} >
                                                    <TextField 
                                                        id="outlined-basic" 
                                                        className={"inputBox"}
                                                        error={errors.last_name && touched.last_name ? true : false}
                                                        helperText={errors.last_name && touched.last_name && errors.last_name} 
                                                        label="გვარი" 
                                                        variant="outlined" 
                                                        type="text" 
                                                        name="last_name" 
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.last_name}
                                                    />
                                                </Grid>


                                                <Grid  item className={"gridBox"}  xs={12} sm={6} >
                                                    <TextField 
                                                        id="outlined-basic" 
                                                        className={"inputBox"} 
                                                        error={errors.phone && touched.phone ? true : false}
                                                        helperText={errors.phone && touched.phone && errors.phone}
                                                        label="ტელეფონი" 
                                                        variant="outlined"
                                                        type="number" 
                                                        name="phone" 
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.phone} 
                                                    />
                                                </Grid>

                                                <Grid  item className={"gridBox"}  xs={12} sm={6}>
                                                    <TextField 
                                                        id="outlined-basic" 
                                                        className={"inputBox"} 
                                                        error={errors.personal_id && touched.personal_id ? true : false}
                                                        helperText={errors.personal_id && touched.personal_id && errors.personal_id}
                                                        label="პირადი ნომერი" 
                                                        variant="outlined"
                                                        type="number" 
                                                        name="personal_id" 
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.personal_id}
                                                    />
                                                </Grid>

                                                <Grid  item className={"gridBox"}  xs={12} sm={12}>
                                                    <TextField 
                                                        id="outlined-basic" 
                                                        className={"inputBox"} 
                                                        error={errors.email && touched.email ? true : false}
                                                        helperText={errors.email && touched.email && errors.email}
                                                        disabled
                                                        label="ელ-ფოსტა"
                                                        variant="outlined" 
                                                        type="email" 
                                                        name="email" 
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.email}
                                                    />
                                                </Grid>

                                                <Grid  item className={"gridBox"}  xs={12}  sm={6} >
                                                    <FormControl variant="outlined" className={`formControll ${classes.formControl}`}>
                                                        <InputLabel id="demo-simple-select-outlined-label">ქალაქი</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-outlined-label"
                                                            id="demo-simple-select-outlined"
                                                            value={city}
                                                            onChange={handleChangeSelect}
                                                            label="ქალაქი"
                                                        >
                                                            <MenuItem className="selectItem" value={"თბილისი"}>თბილისი</MenuItem>
                                                            <MenuItem className="selectItem" value={"ქუთაისი"}>ქუთაისი</MenuItem>
                                                            <MenuItem className="selectItem" value={"რუსთავი"}>რუსთავი</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                                <Grid item className={"gridBox"}  xs={12} sm={6} >
                                                    <TextField 
                                                        id="outlined-basic" 
                                                        className={"inputBox"} 
                                                        error={errors.shipping_address && touched.shipping_address ? true : false}
                                                        helperText={errors.shipping_address && touched.shipping_address && errors.shipping_address}
                                                        label="მიწოდების მისამართი" 
                                                        variant="outlined" 
                                                        type="text" 
                                                        name="shipping_address" 
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.shipping_address}
                                                    />
                                                </Grid>

                                                <Grid  item className={"btn-link-box"} xs={12} >
                                                    <p className="backToCart" onClick={() => history.goBack()}>
                                                        <i className="fas fa-arrow-left"></i> უკან დაბრუნება
                                                    </p>

                                                    <Button variant="contained" className="pay-btn" type="submit" disabled={isSubmitting}>
                                                        გაგრძელება
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    )}
                                </Formik>
                            )}
                        </div>
                    </Grid>

                    <Grid container item className={"totalPriceBox"}  sm={12} md={4}>
                        <Grid  item className={"productCard-prices"} xs={12} >
                            <div className="productCard">
                                {cartItems.map((cart: Cart, index: number) => (
                                    <div className="item" key={index}>
                                        <Link to="">
                                            <figure>
                                                <img src={environment.imageBaseURL + cart.image} alt="" />
                                            </figure>
                                        </Link>

                                        <div>
                                            <Link to={`/products/${cart.product_id}`}>
                                                {cart.name}
                                            </Link>
                                            
                                            <p className="quantity"><span><strong>რაოდენობა: </strong> {cart.quantity}  </span></p>
                                            <p> <span><strong>საცალო ფასი: </strong> {cart.amount} ₾</span></p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <p>პროდუქტების ჯამური ფასი
                                <span>{totalCartPrice} ₾</span>
                            </p>
                            <p>მიტანის ფასი
                                <span>{shippingPrice} ₾</span>
                            </p>
                            <h3>ჯამური ფასი
                                <strong>{totalPrice} ₾</strong>
                            </h3>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    )
}