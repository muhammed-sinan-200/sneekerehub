import  { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { CiUser } from 'react-icons/ci'
import { PiShoppingCartSimpleThin } from 'react-icons/pi'
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import './CSS/NavStyle.css'


const NavbarComp = () => {
  const {cartItems}=useContext(CartContext)
  return (
    <Navbar bg='light' className=' sticky-top box-shadow' variant='light' expand='lg' style={{ boxShadow: '0 .5px 15px rgba(0, 0, 0, .30)' }}>
      <Container fluid className='text-dark fw-semibold'>
        <Navbar.Brand as={Link} to='/'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7GhFWiVPAAb-py74iYchtHb6DPGmKBrPqTA&s" alt="SeekerHub"
            style={{ maxHeight: '70px' }}
            className="d-inline-block align-top img-fluid ms-4" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav'className='toggle-nav' ></Navbar.Toggle>
        <Navbar.Collapse id='basic-navbar-nav'>
          <div className='mx-auto d-flex flex-column flex-lg-row gap-4'>
            <Nav className='me-5 gap-3 d-flex align-items-end  '>
              <Nav.Link as={Link} to='/'className='hover-link'>HOME</Nav.Link>
              <Nav.Link as={Link} to='/shop'className='hover-link'>SHOP</Nav.Link>
              <Nav.Link as={Link} to='/about' className='hover-link'>ABOUT</Nav.Link>
              <Nav.Link as={Link} to='/contact'className='hover-link' >CONTACT</Nav.Link>
            </Nav>
            <div className='ms-auto align-items-center gap-5 d-flex me-4'>
              <Nav.Link as={Link} to='/cartPage' className='text-dark position-relative gap-2'>
                <PiShoppingCartSimpleThin size={30} className='hover-link'/>
                {cartItems.length>0 && (
                <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>{cartItems.length}</span>
                )}
              </Nav.Link>

              <a as={Link} to='/' className='text-dark position-relative gap-2'>
                <CiUser size={30} />
              </a>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}

export default NavbarComp