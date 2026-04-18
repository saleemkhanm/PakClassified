import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { MdLocationOn, MdMail, MdPhone } from "react-icons/md";
import Form from 'react-bootstrap/Form';

const Contact = () => {
    return (
        <Container fluid style={{ overflowX: "hidden" }}> {/* Prevent horizontal scrollbar */}
            <Row className="mt-4 ">

                <Col md={4}>
                    <Card style={{ width: '22rem', marginTop: "20px", background: "lightgreen", color: "green" }}>
                        <Card.Body >
                            <Card.Text>
                                <h4 className="d-flex align-items-center gap-2">
                                    <MdLocationOn />
                                    Gulberg ||| Lahore
                                </h4>

                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4} >
                    <Card style={{ width: '22rem', marginTop: "20px", background: "lightgreen", color: "green" }}>
                        <Card.Body >
                            <Card.Text>
                                <h4 className="d-flex align-items-center gap-2">
                                    <MdMail />
                                    @Evsgmail.com
                                </h4>

                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card style={{ width: '22rem', marginTop: "20px", background: "lightgreen", color: "green" }}>
                        <Card.Body >
                            <Card.Text>
                                <h4 className="d-flex align-items-center gap-2">
                                    <MdPhone />
                                    0344343343
                                </h4>

                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
            <Row className="mt-5">
                <Col>
                    <img src="Cars Images/vezel.jpg" alt="" style={{ width: "450px" }} />

                </Col>
                <Col>
                    <Form>

                        <Row>
                            <p>For any Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam consequatur et nesciunt. Officia incidunt molestias, laborum unde harum atque nostrum facilis! Lauda</p>
                            <Col>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Control type="text" placeholder="Your Name" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Control type="email" placeholder="Your Email" />
                                </Form.Group>
                            </Col>
                            <Form.Group className="mb-3" controlId="subject">
                                <Form.Control type="text" placeholder="Subject " />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="message">
                                <Form.Control type="text" as="textarea" rows={4} placeholder="Leave a message here " />
                            </Form.Group>
                            <Button className="btn btn-success">Send Message</Button>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Contact;
