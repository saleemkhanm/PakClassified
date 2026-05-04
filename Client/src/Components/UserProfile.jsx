import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { MdLocationOn, MdKeyboardArrowRight } from "react-icons/md";
import { FaMoneyBill, FaArrowAltCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PostModal from "../Modals/PostModal";
import ProfileModal from "./ProfileModal";

//  FIXED IMPORTS
import { logout, setUser } from "../Components/Store/UserSlice";

const UserProfile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ads, setAds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    contact: "",
    dob: "",
    image: "",
    _id: "",
  });

  // ✅ SYNC USER → PROFILE
  useEffect(() => {
    if (!user) return;

    setProfile({
      name: user.name || "",
      contact: user.contact || "",
      dob: user.dob || "",
      image: user.image || "",
      _id: user._id || "",
    });
  }, [user]);

  // ✅ FETCH ADS
  useEffect(() => {
    if (!user?._id) return;

    const fetchAds = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/advertisment");
        const data = await res.json();

        const myAds = (data.advertisment || []).filter(
          (ad) =>
            (ad.userid?._id || ad.userid)?.toString() ===
            user._id.toString()
        );

        setAds(myAds);
      } catch (error) {
        setAds([]);
      }
    };

    fetchAds();
  }, [user]);

  // ✅ DELETE AD
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/v1/advertisment/${id}`, {
        method: "DELETE",
      });

      setAds((prev) => prev.filter((ad) => ad._id !== id));
    } catch (error) {
      console.log("Delete failed");
    }
  };

  // ✅ LOGOUT FIXED
  const handleLogout = () => {
    dispatch(logout());   // ✅ correct action
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* PROFILE */}
      <Container className="mt-4">
        <Card className="p-3">
          <h3>User Profile</h3>

          <Row>
            <Col md={4}>
              <img
                src={
                  profile.image
                    ? `http://localhost:3000/uploads/${profile.image}`
                    : "/default-user.png"
                }
                alt="profile"
                style={{ width: "150px", borderRadius: "50%" }}
              />
            </Col>

            <Col md={8}>
              <h5>Name: {profile.name}</h5>
              <h6>Contact: {profile.contact}</h6>
              <h6>DOB: {profile.dob}</h6>

              <Button onClick={() => setShowProfileModal(true)}>
                Update Profile
              </Button>

              <Button
                variant="danger"
                className="ms-2"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Col>
          </Row>
        </Card>
      </Container>

      {/* ADS */}
      <h2 className="text-center mt-3">My Advertisements</h2>

      <Row>
        {ads.length > 0 ? (
          ads.map((item) => (
            <Container key={item._id} fluid className="d-flex gap-4 mt-3">

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

                    <h6>
                      <MdLocationOn /> {item.cityareaid?.name || "No Area"}
                      <span className="ms-2">
                        <FaMoneyBill /> {item.price}
                      </span>
                    </h6>
                  </Col>

                  <h5>Description</h5>
                  <p>{item.description}</p>

                  <h5>Features</h5>
                  <h6>
                    <FaArrowAltCircleRight /> {item.feature}
                  </h6>

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
                </Row>
              </div>

              <Card style={{ width: "18rem", marginTop: "40px" }}>
                <Card.Body>
                  <h5>Advertisement Summary</h5>

                  <h6>
                    <MdKeyboardArrowRight /> {item.name}
                  </h6>

                  <h6>
                    <MdKeyboardArrowRight /> Area: {item.cityareaid?.name || "N/A"}
                  </h6>

                  <h6>
                    <MdKeyboardArrowRight /> Price: {item.price || "N/A"}
                  </h6>


                  <h6>
                    <MdKeyboardArrowRight /> Start On: {item.starton || item.startOn || item.start_date || "N/A"}
                  </h6>

                  <h6>
                    <MdKeyboardArrowRight /> End On: {item.endon || item.endOn || item.end_date || "N/A"}
                  </h6>

                  <h6>
                    <MdKeyboardArrowRight /> Contact: {item.contact || item.userid?.contact || profile.contact || "N/A"}
                  </h6>


                </Card.Body>
              </Card>
            </Container>
          ))
        ) : (
          <h3 className="text-center mt-4">No Advertisements Found</h3>
        )}
      </Row>

      {/* MODALS */}
      <PostModal
        show={showModal}
        handleClose={() => {
          setShowModal(false);
          setEditData(null);
        }}
        editData={editData}
      />

      <ProfileModal
        show={showProfileModal}
        handleClose={() => setShowProfileModal(false)}
        user={profile}
        onUpdate={(updatedUser) => {
          if (!updatedUser) return;

          setProfile((prev) => ({
            ...prev,
            ...updatedUser,
          }));

          // ✅ sync Redux
          dispatch(setUser(updatedUser));
        }}
      />
    </>
  );
};

export default UserProfile;