import React from 'react'
import '../stylesheet/about-us.scss'

export const AboutUsScreen: React.FC = () => {
    return (
        <React.Fragment>
            <div className="about">
                <h1>ჩვენ შესახებ</h1>
                <div className="text">
                    <img
                        src="https://welpmagazine.com/wp-content/uploads/2020/11/1559674671-2023.jpg"
                        alt=""/>
                    <p>შ.პ.ს "ადა" 2014 წელს დაფუძნდა და 5 წელზე მეტია კომპიუტერული ტექნიკის ქართულ ბაზარზე მოღვაწეობს. ამჟამად „ადა" კომპიუტერული ტექნიკის სადისტრიბუციო კომპანიას წარმოადგენს. მის ფლობელობაშია ლოკალიზებული მაღაზია ა. მიცკევიჩის #4-ში და ინტერნეტ მაღაზია Adashop სადაც ნებისმიერი პროდუქტის შეძენა ყველაზე ხელსაყრელ ფასად არის შესაძლებელი.</p>
                   <h1>ჩვენი მიზანი</h1>
                    <ul>
                        <li>შევთავაზოთ ჩვენს მომხმარებელს სასურველი პროდუქციის ყველაზე დიდი არჩევანი.
                        </li>
                        <li>ნებისმიერი პროდუქტის ფასი იყოს ადეკვატური საბაზრო ფასთან მიმართებაში და მისი შეძენა ყველაზე ხელსაყრელი გახდეს ჩვენს მაღაზიაში.
                        </li>
                        <li>მოვახდინოთ მომხმარებლისათვის პროდუქციის ყველაზე სწრაფად მიწოდება.
                        </li>
                        <li>გავხდეთ საუკეთესო მაღაზია ქართულ ონლაინ სივრცეში.</li>
                     </ul>
                </div>
            </div>
        </React.Fragment>
    )
}