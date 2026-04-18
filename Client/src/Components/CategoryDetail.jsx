
import { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// Icons
import { MdLocationOn, MdKeyboardArrowRight } from "react-icons/md";
import { FaMoneyBill, FaArrowAltCircleRight } from "react-icons/fa";

const CategoryDetail = () => {
  const { id } = useParams();
  const [ads, setAds] = useState([]);
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (!id) return;


    if (location.pathname.includes("details")) {

      fetch(`http://localhost:3000/api/v1/advertisment/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("API Error");
          return res.json();
        })
        .then((data) => {
          console.log("DETAIL DATA:", data);
          setAds([data.advertisment]);
        })
        .catch(() => setAds([]));

    } else {
      // If coming from CATEGORY
      fetch(`http://localhost:3000/api/v1/advertisment/subcategory/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("API Error");
          return res.json();
        })
        .then((data) => {
          setAds(data.bycategory || []);
        })
        .catch(() => setAds([]));
    }

  }, [id, location.pathname]);
  return (
    <Row>
      {ads.length > 0 ? (
        ads.map((item) => (
          <Container
            fluid
            className="d-flex gap-4"
            style={{ marginTop: "20px" }}
            key={item._id}
          >
            {/* LEFT SIDE */}
            <div className="flex-grow-1">
              <Row className="g-0 p-3">
                <Col md="auto">

                  <img
                    src={`http://localhost:3000/uploads/${item.advertismentimgid}`}
                    alt="ad"
                    style={{ width: "70px", objectFit: "cover" }}

                  />
                </Col>

                <Col className="ps-3 d-flex flex-column justify-content-center">
                  <Card.Body className="p-0">
                    <Card.Text>
                      <h5>{item.name}</h5>
                      <p>
                        <MdLocationOn style={{ color: "green" }} />{" "}
                        {item.cityareaid?.name}
                        <span className="ms-2">
                          <FaMoneyBill style={{ color: "green" }} />{" "}
                          {item.price}
                        </span>
                      </p>
                    </Card.Text>
                  </Card.Body>
                </Col>

                <h3 className="mt-3">Description</h3>
                <p>{item.description}</p>

                <h3>Features</h3>
                <h6>
                  <FaArrowAltCircleRight style={{ color: "green" }} />
                  {item.feature}
                </h6>
              </Row>
            </div>

            {/* RIGHT SIDE */}
            <div>
              <Card
                style={{
                  width: "18rem",
                  marginTop: "40px",
                  background: "skyblue",
                }}
              >
                <Card.Body>
                  <Card.Text>
                    <h5>Advertisement Summary</h5>
                    <h6>
                      <MdKeyboardArrowRight /> {item.name}
                    </h6>
                    <h6>
                      <MdKeyboardArrowRight /> Area: {item.cityareaid?.name}
                    </h6>
                    <h6>
                      <MdKeyboardArrowRight /> Price: {item.price}
                    </h6>
                    <h6>
                      <MdKeyboardArrowRight /> Starton: {item.starton}
                    </h6>
                    <h6>
                      <MdKeyboardArrowRight /> Endon: {item.endon}
                    </h6>
                    <h6>
                      <MdKeyboardArrowRight /> Contact: 034445555
                    </h6>
                    {user && item.userid?.toString() === user._id?.toString() && (
  <div className="mt-3">
    <button className="btn btn-danger me-2">
      Delete
    </button>

    <button className="btn btn-primary">
      Update
    </button>
                    </div>
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Container>
        ))
      ) : (
        <div className="d-flex justify-content-center align-items-center ">
          <div className="w-50 text-center ">
            <h1 className="mt-4 bg-primary text-light p-3 rounded">
              No sub category found
            </h1>
          </div>
        </div>

      )}
    </Row>
  );
};

export default CategoryDetail;
