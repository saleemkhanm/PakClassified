
import { Col, Row, Container } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";

export const AboutUs = () => {
  return (
    <Container fluid className="mt-5 bg-secondary">
      <Row className="align-items-center">
        <Col >
          <div className="about-images">
            <div className="">
              <img src="/Cars Images/vezel.jpg" alt="" style={{ width: "200px" }} />
              <img src="/Cars Images/vezel.jpg" alt="" style={{ width: "200px", marginTop: "60px" }} />

            </div>

            <div className="">
              <img src="/Cars Images/vezel.jpg" alt="" style={{ width: "200px", marginTop: "-60px" }} />
              <img src="/Cars Images/vezel.jpg" alt="" style={{ width: "200px" }} />
            </div>
          </div>
        </Col>

        {/* RIGHT CONTENT */}
        <Col className="pt-5 ">
          <h3 className="fw-bold">
            PakClassified is a comprehensive online platform where users can
            browse, buy, sell, and compare cars
          </h3>

          <p className="mt-3 text-muted">
            Welcome to PakClassified, your premier destination for all things
            automotive in Pakistan. Our platform is designed to offer a seamless
            experience for users looking to browse, buy, sell, and compare cars.
          </p>

          <ul className="">
            <li className="d-flex align-items-center gap-2">
              <FaCheck className="text-success" />
              Customer Support
            </li>
            <li className="d-flex align-items-center gap-2">
              <FaCheck className="text-success" />
              Technical Assistance
            </li>
            <li className="d-flex align-items-center gap-2">
              <FaCheck className="text-success" />
              Feedback and Suggestions
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};
