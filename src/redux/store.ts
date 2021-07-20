import { applyMiddleware, combineReducers, createStore } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import { AuthenticationReducer } from './authentication/auth-reducer'
import { ApplicationReducer } from './app/app-reducer'
import { ProductReducer } from './product/product-reducer'
import { CartReducer } from "./cart/cart-reducer"
import { reducer as toastrReducer } from 'react-redux-toastr'
import { FavoritesReducer } from "./favorites/favorites-reducer"
import { ShippingReducer } from "./shipping/shipping-reducer"
import { OrderReducer } from "./order/order-reducer"
import ReduxThunk from 'redux-thunk'

const rootReducer = combineReducers({
    auth: AuthenticationReducer,
    app: ApplicationReducer,
    toastr: toastrReducer,
    products: ProductReducer,
    cart: CartReducer,
    favorites: FavoritesReducer,
    shipping: ShippingReducer,
    orders: OrderReducer
})

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk))
)

export type RootState = ReturnType<typeof rootReducer>