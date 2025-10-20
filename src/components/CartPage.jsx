import React, { useContext } from 'react'
import { CartContext } from './CartContext'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';

const CartPage = () => {
  const { cartItems, addToCart, decreaseQuantity } = useContext(CartContext);
  const totalPrice = cartItems.reduce(
    (total, item) => total + (Number(item.price) || 0) * (item.quantity || 0), 0)
  return (
    <Container fluid className='my-5' style={{ minHeight: '100vh' }}>
      <Row>
        <Col md={6} className=''>
          <h3>Special offers waiting for you</h3>
          <div className='adv-div'
          style={{
          height:"250px",
          width:'80%',
          backgroundColor:"light",
          border:'1px solid',
          }}
          >
            <iframe 
            title='adv'
            src='https://source.unsplash.com/800x300/?advertisement'
            width='100%'
            height='100%'
            loading='lazy'
            >

            </iframe>
          </div>
        </Col>

        <Col md={6}>
          <h3>Your Cart ({cartItems.length})</h3>
          {cartItems.length === 0 ? (
            <p>OOPS, Empty🛒</p>
          ) : (
            <div>
              {cartItems.map((item) => (
                <Row key={item.id} className='bg-light align-items-center mb-4 border-bottom'>
                  <Col>
                    <Image
                      src={item.img}
                      fluid rounded
                      style={{ maxHeight: '150px', objectFit: 'cover' }}
                    />
                  </Col>
                  <Col>
                    <h4>{item.name}</h4>
                    <h5>$ {item.price}</h5>
                    <h6>size: UK {item.selectedSize}</h6>
                  </Col>
                  <Col className='d-flex gap-3'>
                    <Button
                      variant='outline-secondary' 
                      size='md'
                      onClick={() => decreaseQuantity(item.id)}>-</Button>
                    <span className='mt-2'><p>{item.quantity}</p></span>
                    <Button
                      variant='outline-secondary'
                      size='md'
                      onClick={() => addToCart(item)}>+</Button>
                  </Col>
                  {/* <Col>${(item.price * item.quantity).toFixed(0)}</Col> */}
                </Row>
              ))}
              <Row>
            <Col className='text-end'>
              <Button onClick={()=>alert('Your Order is placed')} 
              variant='secondary' className='fw-bold checkout-btn'> CheckOut $ {totalPrice.toFixed(0)}</Button>
            </Col>
          </Row>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default CartPage