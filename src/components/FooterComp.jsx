import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { CiLocationOn } from 'react-icons/ci'
import {  BsTelephone } from 'react-icons/bs'
import { PiEnvelopeSimpleThin } from 'react-icons/pi'
import { FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FaYoutube } from 'react-icons/fa'
import { FaFacebookF } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './CSS/FooterStyle.css'


const FooterComp = () => {
    return (
        <footer className='bg-light border-top pt-5'>
            <Container className=''>
                <Row className=''>
                    <Col className=''>
                        <h3 className='mb-4 fw-bold'>CONTACT US</h3>
                        <p className='text-lead '>We love connecting with our sneeker community-at sneeker@community.com or <br /> hit us on twitter facebook and instagram </p>
                        <h5 className='my-4  fw-bold'>ADDRESS</h5>

                        <ul className='list-unstyled'>
                            <div className='d-flex gap-3 flex-column'>
                                <li>
                                    <CiLocationOn size={30} /> 321 SH street ,Barcelona,Spain
                                </li>
                                <li>
                                    <BsTelephone size={20} /> +34 9876542
                                </li>
                                <li>
                                    <PiEnvelopeSimpleThin size={20} /> support@sneekerhub.com
                                </li>
                            </div>
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col md={4} className='d-flex gap-5'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7GhFWiVPAAb-py74iYchtHb6DPGmKBrPqTA&s"
                            alt="logohere" style={{ maxHeight: '70px' }} />
                        <div>
                            <h1 className='fw-bold'>SneekerHub</h1>
                            <p className='text-dark'>elevate your style</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className='mt-3'>
                        <h5 className='fw-bold mb-4'>FOLLOW US</h5>
                        <div className="d-flex gap-4">
                            <a href="" className='text-decoration-none follow-icons ig'><FaInstagram size={30} /></a>
                            <a href="" className='text-decoration-none follow-icons twit'><FaXTwitter size={30} /></a>
                            <a href="" className='text-decoration-none follow-icons utube'><FaYoutube size={30} /></a>
                            <a href="" className='text-decoration-none follow-icons fb'><FaFacebookF size={30} /></a></div>
                        <p className='text-muted fw-light'>By clicking this link you will be directed to Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </Col>
                    <Col md={6} className='text-md-start mt-3'>
                        <h5 className='fw-bold'>QUICK LINKS</h5>
                        <ul className='list-unstyled'>
                            <li className='mb-3'><Link to='/' className='text-decoration-none text-dark quick-links'>Home</Link></li>
                            <li className='mb-3'><Link to='/shop' className='text-decoration-none text-dark quick-links'>Shop</Link></li>
                            <li className='mb-3'><Link to='/about' className='text-decoration-none text-dark quick-links'>About</Link></li>
                            <li className='mb-3'><Link to='/contact' className='text-decoration-none text-dark quick-links'>Contact</Link></li>
                        </ul>
                        </Col>
                </Row>
                <Row className='mt-5'>
                    <Col className='small text-dark text-center'>
                    <p>&copy;2025 SneekerHub.All rights reserved</p> 
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default FooterComp