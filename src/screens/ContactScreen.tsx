import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import '../stylesheet/contact.scss'

export const ContactScreen: React.FC = () => {
    const MyMapComponent = withScriptjs(withGoogleMap((props: any) => (
        <GoogleMap defaultZoom={16} defaultCenter={{ lat: 41.72430, lng: 44.77032 }}>
            {props.isMarkerShown && <Marker position={{ lat: 41.72430, lng: 44.77032 }} />}
        </GoogleMap>
    )))

    return (
        <React.Fragment>
            <div className="contact">
                <h1>კონტაქტი</h1>

                <div className="contact-address">
                    <div>
                        <i className="fas fa-phone-volume"></i>
                        <h2>ტელეფონის ნომერი</h2>
                        <p>Phone 01: <a href="tel:0322 24 40 30">0322 24 40 30</a></p>
                        <p>Phone 02: <a href="tel:577 55 36 76">577 55 36 76</a></p>
                    </div>

                    <div>
                        <i className="fas fa-map-marker-alt"></i>
                        <h2>მისამართი</h2>
                        <p>ა, #4 Adam Mitskevichi St, Tbilisi</p>
                    </div>

                    <div>
                        <i className="fas fa-paper-plane"></i>
                        <h2>ელ-ფოსტა</h2>
                        <p>E-mail 01: <a href="mailto:order@adashop.ge">order@adashop.ge</a></p>
                        <p>E-mail 02: <a href="mailto:info@adashop.ge">info@adashop.ge</a></p>
                    </div>
                </div>
            
                <form action="" id="contactForm">
                    <div className="mandatory">
                        <input type="text" placeholder="სახელი"/>
                        <p className="error-message">Error message</p>
                    </div>

                    <div className="mandatory">
                        <input type="text" placeholder="გვარი"/>
                        <p className="error-message">Error message</p>
                    </div>

                    <div className="mandatory">
                        <input type="mail" placeholder="ელ-ფოსტა"/>
                        <p className="error-message">Error message</p>
                    </div>

                    <div>
                        <input type="number" placeholder="ტელეფონი"/>
                        <p className="error-message">Error message</p>
                    </div>

                    <div>
                        <textarea placeholder="შეტყობინება"></textarea>
                    </div>

                    <div className="btn-agree">
                        <button type="submit" id="submit">გაგზავნა</button>
                    </div>
                </form>

                <div id="map">
                    <MyMapComponent
                        isMarkerShown
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAjV1c1BwZDi4OoC25Hxts6haHHJm0KTbA&callback=initMap"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </div>
            </div>
        </React.Fragment>
    )
}
