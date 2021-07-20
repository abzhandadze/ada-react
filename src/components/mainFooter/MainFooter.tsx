import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../redux/store'
import './mainFooter.scss'

export const MainFooter = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth)

    const scrollTop = () =>{
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
     
    return (
        <footer className="footer"> 
            <button className="scroll-top" onClick={scrollTop}>თავში დაბრუნება</button>

            <div className="footer-top">
                <div>
                    <Link className="footer-logo" to=""><p>ADA</p></Link>

                    <div className="phone"> 
                        <img src="/images/icon-phone2.png" alt=""/>
                        <div className="text"> 
                            <p>ცხელი ხაზი 24/2:</p>
                            <Link to="tel:577 55 36 76">577 55 36 76</Link>
                            <Link to="tel:0322 24 40 30">0322 24 40 30</Link>
                        </div>
                    </div>

                    <Link className="mail" to="mailto:Contact@erentheme.com">info@adashop.ge</Link>

                    <address>ა, #4 Adam Mitskevichi St, Tbilisi</address>
                </div>

                <ul> 
                    <li><h2>Ჩემი ანგარიში</h2></li>
                    {isAuthenticated ? (
                        <>
                            <li><Link to="/profile">ჩემი პროფილი</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/registration">რეგისტრაცია</Link></li>
                            <li><Link to="/login">ავტორიზაცია</Link></li>
                        </>
                    )}
                </ul>

                <ul> 
                    <li><h2>ინფორმაცია</h2></li>
                    <li><Link to="/about">ჩვენ შესახებ</Link></li>
                    <li><Link to="/privacy-police">წესები და პირობები</Link></li>
                    <li><Link to="/how-to-buy">როგორ ვიყიდო</Link></li>
                    <li><Link to="/delivery-and-payment">მიწოდება და გადახდა</Link></li>
                </ul>

                <ul> 
                    <li><h2>ნავიგაცია</h2></li>
                    <li><Link to="/">მთავარი</Link></li>
                    <li><Link to="/contact">კონტაქტი</Link></li>
                    <li><Link to="/offer-to-organizations">შეთავაზება ორგანიზაციებს</Link></li>
                </ul>
            </div>

            <div className="footer-bottom"> 
                <p>Copyright © <span>IntellectWork Software</span></p>
            </div>
        </footer>
    )
}