import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
const Carosel = () => {
    return (
        <>
            {/*By Default its 3 second */}
            <Carousel interval={4000}>
                <Carousel.Item className='imgg'>
                    <img src="/public/Cars Images/cars.png" alt="" style={{ width: "100%" }} />
                    <Carousel.Caption className='txt'>
                        <h2>Shift Into Gear: <br /> Your Destination <br /> For Car Execellence</h2>
                        <h5>Drive Your Dream: Find Your Perfect Car</h5>
                        <Button className='btn btn-success'>
                            Search A Car
                        </Button>
                        <Button className='btn btn-primary m-3'>
                            Post Advertisement
                        </Button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item >
                    <img src="/public/Cars Images/cars.png" alt="" style={{ width: "100%" }} />
                    <Carousel.Caption className='txt'>
                        <h2>Unlock Your Drive <br />Explore, Compare</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <Button className='btn btn-success'>
                            Search A Car
                        </Button>
                        <Button className='btn btn-primary m-3'>
                            Post Advertisement
                        </Button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src="/public/Cars Images/cars.png" alt="" style={{ width: "100%" }} />
                    <Carousel.Caption className='text'>
                        <h2> Advertisement Categories </h2>

                    </Carousel.Caption>

                </Carousel.Item>
            </Carousel>


        </>
    )
}

export default Carosel