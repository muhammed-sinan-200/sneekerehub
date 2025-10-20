import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './CSS/AboutStyle.css'
const AboutComp = () => {
  return (
    <Container fluid className='p-0 mb-4'>
      <Row>
        <Col className='text-center py-4'>
          <h1 className='fw-semibold fontstyle'>OUR STORY</h1>
        </Col>
      </Row>
      <Row className='text-center bg-white gap-0 d-flex align-items-stretch'>
        <Col md={6} className=''>
          <div
            style={{
              width: '100%',
              height: '450px',
              backgroundImage: 'url("/about-img/about-img-old.jpg")',
              WebkitBackgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
        </Col>
        <Col md={6} className='text-start fontstyle'>
          <h3 className='fw-bold text-dark mx-5 mt-4'>ON 1959</h3>
          <div className='align-items-center '>
            <p className='mx-5 mt-5 fs-5' style={{ 
              color: 'rgba(31, 31, 31, 1)'
               }}>In 1959, our journey began with a simple idea: to create footwear that combined style, 
               comfort, and innovation. Starting from a small workshop, our founders poured passion into 
               every pair, establishing a brand that would eventually redefine sneaker culture. Every step 
               we took laid the foundation for the community and legacy we celebrate today.</p>
          </div>
        </Col>
      </Row>
      <Row className='text-center bg-white gap-0 d-flex align-items-stretch'>
        <Col md={6} className='text-start order-2 order-md-1 fontstyle'>
          <h3 className='fw-bold text-dark mx-5 mt-4'>HISTORY & MILESTONES</h3>
          <div className='align-items-center'>
            <p className=' mx-5 mt-5 fs-5' style={{
               color: 'rgba(31, 31, 31, 1)'
                }}>Over the decades, we’ve achieved remarkable milestones that shaped our brand.
                 From our first limited edition release in 1975 to collaborating with legendary 
                 athletes and designers in the 1990s, each moment reflects our dedication to 
                 quality and authenticity. These pivotal experiences not only expanded our reach
                  but also strengthened our connection with sneaker enthusiasts worldwide.</p>
          </div>
        </Col>
        <Col md={6} className='order-1 order-md-2'>
          <div
            style={{
              width: '100%',
              height: '450px',
              backgroundImage: 'url("/about-img/about-img2.jpg")',
              WebkitBackgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
        </Col>

      </Row>
        <Row className='text-center bg-white gap-0 d-flex align-items-stretch'>
        <Col md={6}>
          <div
            style={{
              width: '100%',
              height: '450px',
              backgroundImage: 'url("/about-img/about-img1.webp")',
              WebkitBackgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
        </Col>
        <Col md={6} className='text-start fontstyle'>
          <h3 className='fw-bold text-dark mx-5 mt-4'>Our Vision & Legacy</h3>
          <div className='align-items-center '>
            <p className='mx-5 mt-5 fs-5' style={{ 
              color:'rgba(31, 31, 31, 1)'
               }}>Today, we continue to honor our roots while pushing boundaries in design and 
               innovation. Our vision is to craft sneakers that inspire self-expression and 
               celebrate culture. From iconic collaborations to limited-edition drops, every
                creation tells a story — a story of heritage, creativity, and the enduring love 
                for sneakers that unites our global community</p>
          </div>
        </Col>
      </Row>
      
    </Container>
  )
}

export default AboutComp