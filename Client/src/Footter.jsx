
import { Button, Col, Container, InputGroup, Row } from "react-bootstrap"
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa"
import { MdEmail, MdKeyboardArrowRight, MdLocationOn, MdPhone } from "react-icons/md"
import Form from 'react-bootstrap/Form';

export const Footter = () => {
  return (
    <>
      <Container fluid className="mt-5 bg-dark text-light align-content-center">
        <Row className="mt-5 justify-content-center p-3">

          <Col>
            <h3>Company</h3>
            <p style={{ textAlign: "justify" }}>
              Lorem ipsum dolor sit amet, eligendi, molestias
              obcaecati, facilis dicta soluta ipsum eveniet
              Lorem ipsum dolor sit amet, eligendi
              Lorem ipsum dolor sit amet, eligendi
            </p>
          </Col>

          <Col>
            <h3>Quick Links</h3>

            <h6 className="d-flex align-items-center gap-2">
              <MdKeyboardArrowRight /> About Us
            </h6>
            <h6 className="d-flex align-items-center gap-2">
              <MdKeyboardArrowRight /> Contact Us
            </h6>
            <h6 className="d-flex align-items-center gap-2">
              <MdKeyboardArrowRight /> Privacy Policy
            </h6>
            <h6 className="d-flex align-items-center gap-2">
              <MdKeyboardArrowRight /> Term & Condition
            </h6>
          </Col>

          <Col>
            <h3>Contact</h3>

            <h6 className="d-flex align-items-center gap-2">
              <MdLocationOn /> Ferozpur Road Gulberg ||| Lahore
            </h6>
            <h6 className="d-flex align-items-center gap-2">
              <MdPhone /> 034446565
            </h6>
            <h6 className="d-flex align-items-center gap-2">
              <MdEmail /> Evs@gmail.com
            </h6>

            <div className="d-flex gap-2 mt-3">
              {[FaTwitter, FaFacebook, FaYoutube, FaLinkedin].map((Icon, i) => (
                <Icon
                  key={i}
                  style={{
                    border: "1px solid white",
                    padding: "8px",
                    borderRadius: "10%",
                    fontSize: "30px"
                  }}
                />
              ))}
            </div>
          </Col>

          <Col>
            <h3>Newsletter</h3>
            <p style={{ textAlign: "justify" }}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </p>

            <Col >
              <Form.Group >
                <InputGroup>
                  <Form.Control type="email" placeholder="Your Email" />
                  <Button className="btn btn-success">Sign Up</Button>
                </InputGroup>
              </Form.Group>
            </Col>
          </Col>

        </Row>
      </Container>
    </>
  )
}
