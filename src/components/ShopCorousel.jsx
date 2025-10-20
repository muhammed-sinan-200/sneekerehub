import React from 'react'
import { Carousel } from "react-bootstrap"

const slides=[
    {id:1,img:'/Carousel-img/slide1-img.webp',alt:'image1'},
    {id:2,img:'/Carousel-img/slide2-img.webp',alt:'image2'},
    {id:3,img:'/Carousel-img/slide3-img.webp',alt:'image3'}
]
const ShopCorousel = () => {
  return (
   <div>
     <Carousel className='bg-dark' interval={3000}>
        {slides.map(slide=>(
        <Carousel.Item key={slide.id}>
            <img 
            className='d-block w-100'
            src={slide.img}
            style={{maxHeight:'545px',objectFit:'cover'}} 
            alt={slide.alt}
            />
        </Carousel.Item>
        ))}
    </Carousel>
   </div>
  )
}

export default ShopCorousel