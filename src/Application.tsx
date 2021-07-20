import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { MainFooter } from './components/mainFooter/MainFooter'
import { Navigation } from './components/navigation/Navigation'
import { LoadingComponent } from './components/LoadingComponent'
import { HomeScreen } from './screens/HomeScreen'
import { LoginScreen } from './screens/LoginScreen'
import { ProductScreen } from './screens/ProductScreen'
import { CartScreen } from './screens/CartScreen'
import { FavoritesScreen } from './screens/FavoritesScreen'
import { RegistrationScreen } from './screens/RegistrationScreen'
import { ForgotPasswordScreen } from './screens/ForgotPasswordScreen'
import { ResetPasswordScreen } from './screens/ResetPasswordScreen'
import { AboutUsScreen } from './screens/AboutUsScreen'
import { ContactScreen } from './screens/ContactScreen'
import { ProfileScreen } from './screens/ProfileScreen'
import { NotFoundComponent } from './components/NotFoundComponent'
import { getBanners, getBrands, getMainCarousel, getMenu } from './redux/app/app-actions'
import { getUser } from './redux/authentication/auth-actions'
import { setAuthToken } from './utils/set-auth-token'
import { getProductsDepartments } from './redux/product/product-actions'
import { QuickView } from './components/modals/quickViewModal/QuickViewModal'
import { ProductDetailScreen } from './screens/ProductDetailScreen'
import { RootState } from './redux/store'
import { ScrollToTop } from './components/ScrollToTop'
import { CheckoutScreen } from './screens/CheckoutScreen'
import { BrandScreen } from './screens/BrandScreen'
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import { PrivateRoute } from './components/PrivateRoute'

export const Application = () => {
    const [pageLoading, setPageLoading] = React.useState(true)

    const { 
        mainCarouselData, banners, brands, sections, 
        quickViewProductData, quickViewModalVisible 
    } = useSelector((state: RootState) => state.app)

    const { departments } = useSelector((state: RootState) => state.products)

    const dispatch = useDispatch()
    const token: string = localStorage.token

    React.useEffect(() => {
        dispatch(getMenu())
        dispatch(getProductsDepartments())
        dispatch(getMainCarousel())
        dispatch(getBanners())
        dispatch(getBrands())
    }, [dispatch])

    React.useEffect(() => {
        if (token) {
            setAuthToken(token)
            dispatch(getUser())
        }
    }, [token, dispatch])

    React.useEffect(() => {
        if (
            sections?.length && departments?.length && 
            mainCarouselData?.length && brands?.length && 
            banners?.length
        ) {
            setPageLoading(false)
        }
    }, [sections, departments, banners, brands, mainCarouselData])

    return (
        <React.Fragment>
            {pageLoading ? (
                <LoadingComponent />
            ) : (
                <BrowserRouter>
                    <ReduxToastr 
                        position='top-right' 
                        transitionIn='bounceIn' 
                        transitionOut='bounceOut' 
                        timeOut={4000} 
                        preventDuplicates
                        progressBar
                        closeOnToastrClick
                    />

                    {quickViewModalVisible && (
                        <QuickView product={quickViewProductData} />
                    )}

                    <ScrollToTop />

                    <Navigation />

                    <Switch>
                        <Route exact path="/" component={HomeScreen} />

                        <Route exact path="/cart" component={CartScreen} />
                        <Route exact path="/favorites" component={FavoritesScreen} />

                        <Route exact path="/about" component={AboutUsScreen} />
                        <Route exact path="/contact" component={ContactScreen} />
                        <Route exact path="/profile" component={ProfileScreen} />
                        <Route exact path="/brands/:brandName" component={BrandScreen} />
                        
                        <PrivateRoute exact path="/checkout" component={CheckoutScreen} />

                        <Route exact path="/products" component={ProductScreen} />
                        <Route exact path="/products/section/:section" component={ProductScreen} />
                        <Route exact path="/products/category/:category" component={ProductScreen} />
                        <Route exact path="/products/subcategory/:subcategory" component={ProductScreen} />
                        
                        <Route exact path="/products/:id" component={ProductDetailScreen} />


                        <Route exact path="/login" component={LoginScreen} />
                        <Route exact path="/registration" component={RegistrationScreen} />
                        <Route exact path="/forgot_password" component={ForgotPasswordScreen} />
                        <Route exact path="/reset_password/:resettoken" component={ResetPasswordScreen} />

                        <Route exact path="*" component={NotFoundComponent} />
                    </Switch>

                    <MainFooter />
                </BrowserRouter>
            )}
		</React.Fragment>
    )
}