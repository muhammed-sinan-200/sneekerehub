import { useEffect, useState } from 'react'
import axios from 'axios'
import { Col, Container, Row, Card } from 'react-bootstrap'
import './CSS/newArrivals.css'
import { TbShoppingBagPlus } from "react-icons/tb";

const NewArrivalsComp = ({ onProductClick }) => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/Products.json')
                const newArrivals = response.data.filter(p => p.category === 'new')
                setProducts(newArrivals)
            } catch (error) {
                console.log(error);
            }
        }
        fetchProducts()
    }, [])

    return (
        <Container className=''>
            <h2 className='text-center text-dark my-4 fw-bold new-arrivals'>NEW ARRIVALS</h2>
            <Row className='d-flex flex-wrap justify-content-center'>
                {products.map(product => (
                    <Col key={product.id} xs={6} sm={6} md={3} lg={3} className='mb-4'>
                        <Card className='h-100 text-center product-card border-0'>
                            <Card.Img
                                className='card-img'
                                src={product.img}
                                alt={product.name}
                                style={{ height: '150px', objectFit: 'cover' }}
                            />
                            <Card.Body>
                                <Card.Title className='fw-semibold'>{product.name}</Card.Title>
                                <Card.Text className='fw-semibold'>${product.price}</Card.Text>
                                <TbShoppingBagPlus className='productCartPlus' size={30}
                                    onClick={() => onProductClick(product)} />
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default NewArrivalsComp