export interface SectionResponse {
    success:                boolean;
    data:                   Section[];
}

export interface Section {
    categories?:            Category[];
    _id:                    string;
    name:                   string;
    uid:                    string;
    createdAt:              string;
    updatedAt:              string;
    slug:                   string;
    __v:                    number;
    icon_name?:             string;
    filters:                Filter[];
}

export interface Category {
    _id:                    string;
    name:                   string;
    uid:                    string;
    createdAt:              string;
    updatedAt:              string;
    slug:                   string;
    __v:                    number;
    sub_categories:         SubCategory[];
    parent_section_id:      string;
    filters:                Filter[];
}

export interface SubCategory {
    _id:                    string;
    name:                   string;
    uid:                    string;
    createdAt:              string;
    updatedAt:              string;
    slug:                   string;
    __v:                    number;
    parent_category_id:     string;
    filters:                Filter[];
}

export interface BannerResponse {
    success:                boolean;
    banners:                Banner[];
}

export interface Banner {
    banner_priority:        string;
    image:                  string;
    type:                   string;
    name:                   string;
    price:                  string;
    text:                   string;
    link:                   string;
}

export interface MainCarouselResponse {
    success:                boolean;
    main_carousel:          MainCarouselItem[];
}

export interface MainCarouselItem {
    image_url?:             string;
    type:                   string;
    name:                   string;
    second_name:            string;
    text:                   string;
    link_text:              string;
    link:                   string;
    image?:                 string;
}

export interface BrandResponse {
    success:                boolean;
    brands:                 Brand[];
}

export interface Brand {
    name:                   string;
    link:                   string;
}

export interface Filter {
    list?:                  string[];
    _id:                    string;
    name:                   string;
    query_name:             string;
    section_id?:            string;
    filter_type:            string;
    createdAt:              string;
    updatedAt:              string;
    __v:                    number;
    min?:                   number;
    max?:                   number;
    category_id?:           string;
    sub_category_id?:       string;
}