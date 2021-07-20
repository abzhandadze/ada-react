export interface Product {
    thumbs:                 string[];
    _id:                    string;
    code:                   string;
    product_id:             number;
    product_name:           string;
    supplier_name:          string;
    quantity:               number;
    price:                  number;
    status:                 string;
    weight:                 number;
    min_quantity:           number;
    max_quantity:           number;
    date_added:             string;
    descr:                  string;
    short_descr:            string;
    meta_key:               string;
    meta_desc:              string;
    search_word:            string;
    promo_text:             string;
    taxes:                  string;
    available_since:        string;
    Store:                  string;
    brand:                  string;
    product_section:        string;
    product_category:       string;
    product_sub_category:   string;
    image_url:              string;
    detailed_image_url:     string;
    detailed_image:         string;
}

export interface DepartmentResponse {
    count:                  number;
    pagination:             Pagination;
    success:                boolean;
    products_departments:   ProductsDepartment[];
}

export interface ProductsDepartment {
    department_name:        string;
    department:             Product[];
    bannerPosition:         string;
    carousel_name:          string;
    bannerData:             BannerData;
}

export interface BannerData {
    title:                  string;
    category_title:         string;
    shipping_title:         string;
    image:                  string;
}

export interface Pagination {
    next?:                  Next;
    prev?:                  Prev;
}

export interface Next {
    page:                   number;
    limit:                  number;
}

export interface Prev {
    page:                   number;
    limit:                  number;
}

export interface FeaturesResponse {
    _id:      string;
    code:     string;
    brand:    string;
    features: Feature[];
}

export interface Feature {
    main_feature: string;
    sub_features: SubFeature[];
}

export interface SubFeature {
    feature: string;
    val:     string;
}