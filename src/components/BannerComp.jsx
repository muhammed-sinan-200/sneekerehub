import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const BannerComp = () => {
    return (
        <div className='d-flex align-items-center text-light'
            style={{
                height: '65vh',
                backgroundImage: 'linear-gradient(to top,rgba(0, 0, 0, 0.79),transparent),url("homebanner.webp")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
            <Container className='text-center'>
                <h1 className="display-3 fw-bold">STEP INTO STYLE</h1>
                <p className="lead mt-3">Discover the latest Sneekers that define comfort and fashion.</p>
                <Button className='px-4 opacity-75' variant='light'><Link to='/shop' className='text-decoration-none text-dark'>Shop Now</Link></Button>
            </Container> 

        </div>
    )
}

export default BannerComp