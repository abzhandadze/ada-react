import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, makeStyles, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { UpdatePasswordForm } from '../components/forms/UpdatePasswordForm'
import { useDispatch, useSelector } from 'react-redux'
import { getMyOrders } from '../redux/order/order-actions'
import { RootState } from '../redux/store'
import { Order } from '../redux/order/OrderTypes'
import { Cart } from '../redux/cart/CartTypes'
import { environment } from '../environment/environment'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import moment from 'moment'
import '../stylesheet/profile.scss'
import 'moment/locale/ka'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}))


export const ProfileScreen = () => {
    const [activeTab, setActiveTab] = React.useState(2)

    const { orders } = useSelector((state: RootState) => state.orders)

    const classes = useStyles()
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getMyOrders())
    }, [dispatch])

    const handleClick = e => {
        const tabIndex = parseInt(e.target.id, 0)

        if (tabIndex !== activeTab) {
            setActiveTab(tabIndex)
        }
    }

    return (
        <React.Fragment>
            <main>
                <div className="profile" id="profile" >
                    <h1>მომხმარებლის პროფილი</h1>

                    <ul className="profil-ul">
                        <li 
                            className={`profil-item pro-ord ${activeTab === 2 ? "active" : null} `} 
                            onClick={handleClick} id={"2"}
                        >შეკვეთები</li>

                        <li 
                            className={`profil-item pro-rec ${activeTab === 1 ? "active" : null}`} 
                            onClick={handleClick} id={"1"}
                        >პაროლის შეცვლა</li>
                    </ul>
        
                    <div className={`profile-recovery profile-tabs ${activeTab === 1 ? "active" : null}`} id="form4">
                        <UpdatePasswordForm />
                    </div>
        
                    <div className={`profile-order profile-tabs ${activeTab === 2 ? "active" : null} `}>
                        <div className="order-item">
                            <div className={classes.root}>
                                {orders?.length && orders.reverse().map((order: Order, index: number) => (
                                    <Accordion className="profile-accordion" key={index}>
                                        <AccordionSummary component="div" expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" >
                                            <Typography component="div" className={`order-up ${classes.heading}`}>
                                                <span className="num">{(index + 1).toString()}</span>
                                                   
                                                <div className="box">
                                                    <span className="dat">
                                                        {(moment(order.updatedAt).locale('ka').format('LLLL')).toUpperCase()}
                                                    </span>
                                               

                                                    <div> 
                                                        <strong className="total-price"> ჯამური ფასი:  &nbsp; <p>{order.total_price} ლარი</p> </strong>
                                                        <button className="print-btn" onClick={() => window.print()}>
                                                            <i className="fas fa-print"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                             
                                            </Typography>
                                        </AccordionSummary>

                                        <AccordionDetails className="order-item-box">
                                            {order.order_items.map((cart: Cart, index: number) => (
                                                <Typography component="div"  className="order-down-item" key={index}>
                                                    <Link to="">
                                                        <img src={environment.imageBaseURL + cart.image} alt=""/>
                                                    </Link>
                                                    <Link className="name" to="">Holiday Humor Youth readable opposed <span>#0588184</span></Link>
                                                    <div className="price"><span>საცალო ფასი:</span>
                                                        <p>{cart.amount.toFixed(2)}</p>
                                                    </div>
                                                    <div className="quantity">
                                                        <span>რაოდენობა</span>
                                                        <p>{cart.quantity}</p>
                                                    </div>
                                                    <div className="total"> 
                                                        <span>ჯამური ფასი</span>
                                                        <p>{(cart.amount * cart.quantity).toFixed(2)}</p>
                                                    </div>
                                                </Typography>
                                            ))}
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>    
        </React.Fragment>
    )
}