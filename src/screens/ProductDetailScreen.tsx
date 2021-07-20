import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { environment } from '../environment/environment'
import { toastr } from 'react-redux-toastr'
import { SmallLoadingComponent } from '../components/SmallLoadingComponent'
import { FeaturesResponse, Product, Feature, SubFeature } from '../redux/product/ProductTypes'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { ProductQuantity } from '../components/product/ProductQuantity'
import { AddToCartButton } from '../components/buttons/AddToCartButton'
import { RootState } from '../redux/store'
import { Cart } from '../redux/cart/CartTypes'
import { saveProduct } from '../redux/product/product-actions'
import { ThumbSliderModal } from '../components/carousels/thumbCarousel/ThumbCarousel'
import { VerticalCardsCarousel } from '../components/carousels/verticalCardsCarousel/VerticalCardsCarousel'
import { AddToFavoriteButton } from '../components/buttons/AddToFavoriteButton'
import { FastPayButton } from '../components/buttons/FastPayButton'
import axios, { AxiosResponse } from 'axios'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import '../stylesheet/product-detail.scss' 

/* ========== TAB FUNCTIONS ==========  */

interface TabPanelProps { children?: React.ReactNode; index: any; value: any; }
  
function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography component="div">{children}</Typography>
				</Box>
			)}
		</div>
	)
}
  
function a11yProps(index: any) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	}
}
  
const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	}
}))

export const ProductDetailScreen: React.FC = () => {
	const cartItems = useSelector((state: RootState) => state.cart.cartItems)

    const { lastSeenProducts } = useSelector((state: RootState) => state.products)

	const [pageLoading, setPageLoading] = React.useState(true)
	const [product, setProduct] = React.useState<Product>()
	const [likedProducts, setLikedProducts] = React.useState<Product[]>()
	const [featuresResponse, setFeaturesResponse] = React.useState<FeaturesResponse | undefined>()
	const [quantityNumber, setQuantityNumber] = React.useState(0)

	interface ParamTypes { id: string }

    const { id } = useParams<ParamTypes>()

    const dispatch = useDispatch()

	React.useEffect(() => {
		const inCart = cartItems.filter((cart: Cart) => cart.product_id === product?._id)

		if (inCart?.length) {
			setQuantityNumber(inCart[0].quantity)
		}
	}, [product, cartItems])

	React.useEffect(() => {
		setPageLoading(true)

		axios
			.get(environment.apiBaseURL + '/products/' + id)
			.then(async (response: AxiosResponse) => {
				dispatch(saveProduct(response.data.product))
				setProduct(response.data.product)
				setLikedProducts(response.data.liked_products)

				if (response.data?.features) {
					setFeaturesResponse(response.data?.features)
				} else {
					setFeaturesResponse(undefined)
				}

				setPageLoading(false)
			})
			.catch(() => {
				toastr.error("დაფიქსირდა შეცდომა", "სერვისი დროებით მიუწვდომელია")
			})
	}, [dispatch, id])

	/* ========== TAB FUNCTIONS ==========  */

	const classes = useStyles()
	const [value, setValue] = React.useState(0)
  
	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
	  	setValue(newValue)
	}

    return (
        <React.Fragment>
			{pageLoading || !product ? <SmallLoadingComponent /> : (
				<div className="product-inner">
					<div className="box"> 
					<ThumbSliderModal product={product}/>

						<div className="right"> 
								<h1>{product.product_name}</h1>

							<div className="price"> 
                            	<p>{product.price} ₾</p>
                        	</div>

							<p className="vendor">მომწოდებელი: {product.supplier_name}</p>
					
							<div className="in-stock">
								{product.quantity === 0 ? (
									<i className="fas fa-times"></i>
								) : (
									<i className="fas fa-check"></i>
								)}
								
								<p>{product.quantity === 0 ? "მარაგში არ არის" : "მარაგშია"}</p>
							</div>

							<div className="product-id"> 
								<p>პროდუქტის კოდი: #{product.product_id}</p>
							</div>

							<ul> 
								{product.product_section && (
									<li>
										<p>სექცია: <span>{product.product_section}</span></p>
									</li>
								)}

								{product.product_category && (
									<li>
										<p>კატეგორია: <span>{product.product_category}</span></p>
									</li>
								)}

								{product.product_sub_category && (
									<li>
										<p>ქვე კატეგორია: <span>{product.product_sub_category}</span></p>
									</li>
								)}

								{product.weight && (
									<li>
										<p>წონა: <span>{product.weight} კილოგრამი</span></p>
									</li>
								)}

								{featuresResponse?.brand && (
									<li>
										<p>ბრენდი: <span>{featuresResponse.brand}</span></p>
									</li>
								)}
                        	</ul>

							<div className="spiner-add"> 
								<ProductQuantity 
									productId={product._id} 
									setQuantityNumber={setQuantityNumber} 
									quantityNumber={quantityNumber}
									productQuantity={product.quantity} 
								/>

								<AddToCartButton quantityNumber={quantityNumber} product={product} />

								<FastPayButton quantityNumber={quantityNumber} product={product} />

								<AddToFavoriteButton product={product} />
							</div>
						</div>
					</div>

					{featuresResponse?.features && (
						<div className={classes.root}>
							<AppBar position="static">
								<Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
									<Tab label="პროდუქტის მონაცემები" {...a11yProps(0)} />
								</Tabs>
							</AppBar>

							<TabPanel value={value} index={0}>
								{featuresResponse.features.map((feature: Feature, index: number) => (
									<div className="table" key={index}>
										<div className="thead">
											<h2>{feature.main_feature}</h2>
										</div>

										<div className="tbody">
											{feature.sub_features.map((sub_feature: SubFeature, index: number) => (
												<div key={index}>
													<p>{sub_feature.feature}</p>
													<p>{sub_feature.val}</p>
												</div>
											))}
										</div>
									</div>
								))}
							</TabPanel>
						</div>
					)}
				</div>
			)}

			{likedProducts?.length && 
                <VerticalCardsCarousel 
                sliderData={likedProducts} 
                paginationClassName={'liked-product'} 
                navigationNextName={`liked-product`} 
                navigationPrevName={'liked-product'}   
                sliderName={"liked-product-carousel"} 
                containerName={"მსგავსი პროდუქტები"}  /> 
            }

			{lastSeenProducts?.length && 
                <VerticalCardsCarousel 
                sliderData={lastSeenProducts.reverse()} 
                paginationClassName={'last-seen'} 
                navigationNextName={`last-seen`} 
                navigationPrevName={'last-seen'}   
                sliderName={"last-seen-carousel"} 
                containerName={"ბოლოს ნანახი პროდუქტები"}  /> 
            }
        </React.Fragment>
    )
}