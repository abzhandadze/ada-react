import React from 'react'
import { Filter } from '../../redux/app/ApplicationTypes'

export const ListFilter = ({ filter, productQuery, setProductQuery }: { filter: Filter, productQuery, setProductQuery }) => {
    const [openFilter, setOpenFilter] = React.useState(true)

    const handleToggle = () => {
        setOpenFilter(!openFilter)
    }

    return (
        <React.Fragment>
            <div className="filter-select">
                <div className={`filter-btn ${openFilter ? "active" : null}`} onClick={handleToggle}>
                    <h2>{filter.name}</h2>
                    <i className="fas fa-angle-down"></i>
                </div>

                <div className={`open-filter ${openFilter ? "active" : null}`}> 
                    {filter?.list?.map((item: string, index: number) => (
                        <React.Fragment key={index}>
                            <input 
                                className="procheck" 
                                id={`${item}${index * 7}`} 
                                type="checkbox" 
                                value="" 
                                onClick={() => setProductQuery(`${productQuery}&${filter.query_name}=${item}`)}
                            />

                            <label className="filter-label" htmlFor={`${item}${index * 7}`}>{item}</label>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </React.Fragment>
    )
}