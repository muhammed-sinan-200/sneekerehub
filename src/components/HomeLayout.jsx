import React from 'react'
import BannerComp from './BannerComp'
import NewArrivalsComp from './NewArrivalsComp'
import BannerComp2 from './BannerComp2'

const HomeLayout = ({onProductClick}) => {
    return (
        <div>
            <BannerComp />
            <NewArrivalsComp onProductClick={onProductClick}/>
            <BannerComp2 />
        </div>
    )
}

export default HomeLayout