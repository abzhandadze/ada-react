import { 
    CLOSE_PRODUCT_QUICK_VIEW, OPEN_PRODUCT_QUICK_VIEW, SECTION_LOAD_FAIL, SECTION_LOAD_SUCCESS, 
    BRANDS_LOAD_FAIL, BRANDS_LOAD_SUCCESS, BANNER_LOAD_SUCCESS, BANNER_LOAD_FAIL, 
    MAIN_CAROUSEL_LOAD_SUCCESS, MAIN_CAROUSEL_LOAD_FAIL 
} from "./app-constants"
import { AnyAction } from "redux"
import { Banner, Brand, MainCarouselItem, Section } from "./ApplicationTypes"
import { Product } from "../product/ProductTypes"

type InitialState = { 
    sections?: Section[]; 
    quickViewProductData?: Product | null; 
    quickViewModalVisible?: boolean;
    brands?: Brand[];
    banners?: Banner[]; 
    mainCarouselData?: MainCarouselItem[]; 
}

const initialState: InitialState = {
    sections: [],
    quickViewProductData: null,
    quickViewModalVisible: false,
    brands: [],
    banners: [],
    mainCarouselData: []
}

export const ApplicationReducer = (state = initialState, action: AnyAction) => {
    const { type, payload } = action

    switch (type) {
        case SECTION_LOAD_SUCCESS:
            return { ...state, sections: payload }
        case SECTION_LOAD_FAIL:
            return { ...state, sections: [] }
        case OPEN_PRODUCT_QUICK_VIEW: 
            return { ...state, quickViewModalVisible: true, quickViewProductData: payload }
        case CLOSE_PRODUCT_QUICK_VIEW: 
            return { ...state, quickViewModalVisible: false, quickViewProductData: null }
        case BRANDS_LOAD_SUCCESS:
            return { ...state, brands: payload }
        case BRANDS_LOAD_FAIL:
            return { ...state, brands: [] }
        case BANNER_LOAD_SUCCESS: 
            return { ...state, banners: payload }
        case BANNER_LOAD_FAIL:
            return { ...state, banners: [] }
        case MAIN_CAROUSEL_LOAD_SUCCESS: 
            return { ...state, mainCarouselData: payload }
        case MAIN_CAROUSEL_LOAD_FAIL:
            return { ...state, mainCarouselData: [] }
        default:
            return state
    }
}