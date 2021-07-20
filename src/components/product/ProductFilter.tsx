import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Category, Filter, Section, SubCategory } from '../../redux/app/ApplicationTypes'
import { RootState } from '../../redux/store'
import { ListFilter } from '../filters/ListFilter'
import { SliderFilter } from '../filters/SliderFilter'
import './productFilter.scss'

export const ProductFilter = (
    { sectionId, categoryId, subCategoryId, productQuery, setProductQuery }
    : 
    { sectionId: string, categoryId: string, subCategoryId: string, productQuery, setProductQuery }
) => {
    const [filterData, setFilterData] = useState<Filter[]>([])

    const sections = useSelector((state: RootState) => state.app.sections)

    useEffect(() => {
        const findFiltersData = async () => {
            if (sectionId) {
                const findSection: Section = sections.filter((section: Section) => section._id === String(sectionId))
    
                setFilterData(findSection[0].filters)
            }
    
            if (categoryId) {
                let findCategory: Category | undefined = undefined

                for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
                    for (let categoryIndex = 0; categoryIndex < sections[sectionIndex].categories.length; categoryIndex ++) {
                        if (sections[sectionIndex].categories[categoryIndex]._id === String(categoryId)) {
                            findCategory = sections[sectionIndex].categories[categoryIndex]
                        }
                    }
                }
    
                if (findCategory) {
                    setFilterData(findCategory.filters)
                }
            }
    
            if (subCategoryId) {
                let findSubCategory: SubCategory | undefined = undefined

                for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
                    for (let categoryIndex = 0; categoryIndex < sections[sectionIndex].categories.length; categoryIndex++) {
                        for (let subCategoryIndex = 0; subCategoryIndex < sections[sectionIndex].categories[categoryIndex].sub_categories.length; subCategoryIndex++) {
                            if (sections[sectionIndex].categories[categoryIndex].sub_categories[subCategoryIndex]._id === String(subCategoryId)) {
                                findSubCategory = sections[sectionIndex].categories[categoryIndex].sub_categories[subCategoryIndex]
                            }
                        }
                    }
                }
    
                if (findSubCategory) {
                    setFilterData(findSubCategory.filters)
                }
            }
        }

        findFiltersData()
    }, [sectionId, categoryId, subCategoryId, sections])

    return (
        <React.Fragment>
            {filterData?.length && filterData.map((filter: Filter, index: number) => {
                if (filter.filter_type === "List") {
                    console.log(index + "this")
                    return (
                        <React.Fragment key={index}>
                            <ListFilter productQuery={productQuery} setProductQuery={setProductQuery} filter={filter} />
                        </React.Fragment>
                    )
                } else {
                    return (
                        <React.Fragment key={index}>
                            <SliderFilter productQuery={productQuery} setProductQuery={setProductQuery} filter={filter} />
                        </React.Fragment>
                    )
                }
            })}
        </React.Fragment>
    )
}