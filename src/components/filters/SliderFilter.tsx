import React from 'react'
import { Filter } from '../../redux/app/ApplicationTypes'
import { makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'

const useStyles = makeStyles({
    root: { width: 300 }
})
  
function valuetext(value: number) {
    return `${value}°C`
}

export const SliderFilter = ({ filter, productQuery, setProductQuery }: { filter: Filter, productQuery, setProductQuery }) => {
    const [value, setValue] = React.useState<number[]>([0, filter.max ? filter.max : 30000])
    const [openFilter, setOpenFilter] = React.useState<boolean>(true)

    const handleToggle = () => {
        setOpenFilter(!openFilter)
    }

    const classes = useStyles()

    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[])
    }

    return (
        <React.Fragment>
            <div className="filter-select">
                <div className={`filter-btn ${openFilter ? "active" : null}`} onClick={handleToggle} >
                    <h2>{filter.name}</h2>
                    <i className="fas fa-angle-down"></i>
                </div>

                <div className={`open-filter slider-open-filter ${openFilter ? "active" : null}`}> 

                    <div className={classes.root}>
                        <Slider
                            value={value}
                            max={filter.max}
                            onChange={handleChange}
                            valueLabelDisplay="on"
                            aria-labelledby="range-slider"
                            getAriaValueText={valuetext}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}