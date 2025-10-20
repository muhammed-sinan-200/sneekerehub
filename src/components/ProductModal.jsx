import React, { useContext, useState } from 'react'
import { Button, Col, Image, Modal, Row } from 'react-bootstrap'
import { CartContext } from './CartContext';

const ProductModal = ({show,product,onClose}) => {
    const {addToCart}=useContext(CartContext);

    const [selectedSize,setSelectedSize]=useState(null);

 if (!product) return null;

 const handleAddToCart=()=>{
    if(!selectedSize){
        alert("select your size");
        return;
    }
    addToCart({...product,selectedSize});
    onClose();
 }
    return (
        <Modal  show={show} onHide={onClose} size="lg" centered >
            <Modal.Header closeButton className='border-0'>
            </Modal.Header>
            <Modal.Body>
                <Row className="align-items-center">
                    <Col xs={12} md={6}>
                        <Image src={product.img} alt={product.name} fluid rounded />
                    </Col>
                    <Col xs={12} md={6}>
                    <h3 className='fw-bold'>{product.name}</h3>
                        <p>green output /dolor sit amet, consectetur </p>
                        <h5 className='fw-semibold'>${product.price}</h5>
                        <h5>Shoe Size (UK)</h5>
                        <div className='d-flex gap-3 mt-3'>
                            {product.sizes.map((size,index)=>(
                                <Button
                                 key={index}
                                  className={`border-dark rounded-0 size-btn 
                                    ${selectedSize===size? 'bg-dark text-white':'bg-light'}`}
                                   variant='light'
                                   onClick={()=>setSelectedSize(size)}
                                   >{size}</Button>
                            ))}
                        </div>
                        <div className='d-flex gap-4 mt-5'>
                            <Button  variant='light' className='border border-1 border-black rounded-0 cart-btn'
                            //  onClick={() => {
                                
                            //     addToCart(product);
                            //     onClose();
                            //  }}
                            onClick={handleAddToCart}
                             >Add to Cart</Button>
                            <Button variant='black' className='border border-1 border-black rounded-0 cart-btn'>View More</Button>
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}

export default ProductModal