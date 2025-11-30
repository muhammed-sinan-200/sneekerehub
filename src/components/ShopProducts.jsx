import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { TbShoppingBagPlus } from 'react-icons/tb'

const ShopProducts = ({onProductClick}) => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/Products.json");
                const PopularShoes = response.data
                setProducts(PopularShoes)
            } catch (error) {
                console.error("Error", error);
            }
        }
        fetchProducts()
    }, [])

    return (
        <Container className=''  >
            <h3 className='text-center text-dark my-4 fw-bold new-arrivals'>SNEEKERS</h3>
            <Row className='d-flex flex-wrap justify-content-center'>
                {products.map(product => (
                    <Col key={product.id} xs={6} sm={6} md={3} lg={3} className='mb-4'>
                        <Card className='h-100 text-center product-card border-0 rounded-0'>
                            <Card.Img
                                className='card-img'
                                src={product.img}
                                alt={product.name}
                                style={{ height: '150px', objectFit: 'cover' }}
                            />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>${product.price}</Card.Text>
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

export default ShopProducts