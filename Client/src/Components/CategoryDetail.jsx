import { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { MdLocationOn, MdKeyboardArrowRight } from "react-icons/md";
import { FaMoneyBill, FaArrowAltCircleRight } from "react-icons/fa";
import PostModal from "../Modals/PostModal";

const CategoryDetail = () => {
  const { id } = useParams();
  const [ads, setAds] = useState([]);
  const location = useLocation();

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!id) return;

    if (location.pathname.includes("details")) {
      fetch(`http://localhost:3000/api/v1/advertisment/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const ad = data.advertisment || data.ad || data.data;
          setAds(ad ? [ad] : []);
        })
        .catch(() => setAds([]));
    } else {
      fetch(`http://localhost:3000/api/v1/advertisment/subcategory/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setAds(data.bycategory || []);
        })
        .catch(() => setAds([]));
    }
  }, [id, location.pathname]);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/v1/advertisment/${id}`, {
        method: "DELETE",
      });

      setAds((prev) => prev.filter((ad) => ad._id !== id));
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  return (
    <>
      <Row>
        {ads.length > 0 ? (
          ads.map((item) => {
            const itemUserId = item.userid?._id || item.userid;
            const loggedInUserId = user?._id;
            const isOwner =
              loggedInUserId &&
              itemUserId &&
              loggedInUserId.toString() === itemUserId.toString();

            return (
              <Container fluid className="d-flex gap-4" style={{ marginTop: "20px" }} key={item._id}>
                <div className="flex-grow-1">
                  <Row className="g-0 p-3">
                    <Col md="auto">
                      <img
                        src={`http://localhost:3000/uploads/${item.advertismentimgid}`}
                        alt="ad"
                        style={{ width: "70px" }}
                      />
                    </Col>

                    <Col className="ps-3">
                      <h5>{item.name}</h5>
                      <p>
                        <MdLocationOn /> {item.cityareaid?.name}
                        <span className="ms-2">
                          <FaMoneyBill /> {item.price}
                        </span>
                      </p>
                    </Col>

                    <h3>Description</h3>
                    <p>{item.description}</p>

                    <h3>Features</h3>
                    <h6>
                      <FaArrowAltCircleRight /> {item.feature}
                    </h6>

                    {isOwner && (
                      <div className="mt-3">
                        <button
                          className="btn btn-danger me-2"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>

                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setEditData(item);
                            setShowModal(true);
                          }}
                        >
                          Update
                        </button>
                      </div>
                    )}
                  </Row>
                </div>
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

                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </Container>
            );
          })
        ) : (
          <h1>No Data</h1>
        )}
      </Row>

      <PostModal
        show={showModal}
        handleClose={() => {
          setShowModal(false);
          setEditData(null);

          //  REFETCH DATA AFTER UPDATE
          window.location.reload();
        }}
        editData={editData}
      />
    </>
  );
};

export default CategoryDetail;