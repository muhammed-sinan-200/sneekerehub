import React from 'react'
import { Container ,Row,Col} from 'react-bootstrap'

const BannerComp2 = () => {
    return (
        <>
        <div className='d-flex align-items-center text-ligh my-5'
            style={{
                height: '50vh',
                backgroundImage: 'linear-gradient(to top,rgba(0, 0, 0, 0.79),transparent),url("/Banner2.avif")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <Container>
                    <h1 className="text-center text-white fw-bolder">ADIDAS-SAMBA IS BACK</h1>
                </Container>
        </div>
        <Container className='bg-'>
            <Row className='align-items-center my-5'>
            <Col md={6} className='lead' ><p>Searching for your perfect sneaker? At The SneekerHub, you can explore thousands of styles from Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit, a, obcaecati cupiditate sint pariatur, ab iure animi quia recusandae saepe veniam ullam doloremque vero incidunt veritatis officiis nobis sequi iste?!</p></Col>
            <Col md={6} className='lead' ><p>Stay up to date with upcoming sneaker releases with our sneaker release calendar and Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quo possimus alias aperiam, exercitationem animi maxime cum consectetur. Quia quae quas sint suscipit laborum, iure magnam placeat veniam expedita aliquam.</p></Col>
            </Row>
        </Container>
        </>
    )
}

export default BannerComp2