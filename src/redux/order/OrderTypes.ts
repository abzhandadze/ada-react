import { Cart } from "../cart/CartTypes"
import { ShippingInformation } from "../shipping/ShippingTypes"

export interface Order {
    user:                   string;
    order_items:            Cart[];
    shipping_address:       ShippingInformation;
    payment_method:         string;
    shipping_price:         number;
    total_price:            number;
    createdAt?:             Date;
    updatedAt?:             Date;
}