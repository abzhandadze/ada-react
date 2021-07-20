import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Category, Section, SubCategory } from '../../redux/app/ApplicationTypes'
import { RootState } from '../../redux/store'
import './menu.scss'

interface SectionComponentProps { section: Section }

export const SectionComponent = ({ section }: SectionComponentProps) => {
    const [isActive, setActive] = useState(false)

    const handleToggle = () => {
        setActive(!isActive)
    }
    
    return (
        <li className={`${isActive ? "active" : null}`}>
            <Link to={`products/section/${section._id}`}>
                <i className={section?.icon_name}></i>
                <p>{section?.name}</p>
            </Link>
            
            {section?.categories?.length ?
                <>
                    <i className="fas fa-chevron-right" onClick={handleToggle}></i>

                    <div className="drop-menu" >
                        <ul> 
                            {section?.categories.map((category: Category, index: number) => (
                                <div key={index}>
                                    <CategoryComponent category={category}/>
                                </div>
                            ))}
                        </ul>
                    </div>
                </>
            : null}
        </li>
    )
}

interface CategoryComponentProps { category: Category }

export const CategoryComponent = ({ category }: CategoryComponentProps) => {
    return (
        <li>
            <Link to={`products/category/${category.name}`}>{category.name}</Link>

            {category?.sub_categories?.length ? (
                <>
                    <ul>
                        {category.sub_categories.map((sub_category: SubCategory, index: number) => (
                            <li key={index}>
                                <Link to={`products/subcategory/${sub_category.name}`}>
                                    {sub_category?.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </>
            ) : null}
        </li>
    )
}

export const Menu = () => {
    const sectionsData = useSelector((state: RootState) => state.app.sections)

    const [isActive, setActive] = useState(false)

    const handleToggle = () => {
        setActive(!isActive)
    }

    return (
        <React.Fragment>
            <div className="category-btn" onClick={handleToggle}>
                <i className="far fa-list-alt" ></i>
                <h2>კატეგორიები</h2>
            </div>

            <div className={`category-box ${isActive ? "active" : null}`}>
                <div className="bg" onClick={handleToggle}></div> 
                <div className="top">
                    <h2>კატეგორიები</h2>
                    <i className="fas fa-times" onClick={handleToggle}></i>
                </div>

                <ul className="category-menu">
                    {sectionsData.map((section: Section, index: number) => (
                        <div key={index}>
                            <SectionComponent section={section}/>
                        </div>
                    ))}
                </ul>
            </div>
        </React.Fragment>
    )
}