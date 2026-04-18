
import { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 

const LatestPost = () => {

  const [latest, setLatest] = useState([]);
  const navigate = useNavigate(); 

  // useEffect(() => {
  //   fetch("http://localhost:3000/api/v1/advertisment/latest")
  //     .then((response) => {
  //       if (response.status == 200 || response.status == 201) {
  //         response.json()
  //           .then((jsonData) => {
  //             console.log(jsonData)
  //             setLatest(jsonData)
  //           })
  //       }
  //     }).catch((err) => { console.log(err.message) })
  // }, []);
  useEffect(() => {
  fetch("http://localhost:3000/api/v1/advertisment/latest")
    .then(async (res) => {
      const data = await res.json();
      console.log("LATEST DATA:", data);

      if (res.ok) {
        setLatest(data); // MUST BE ARRAY
      } else {
        setLatest([]);
      }
    })
    .catch((err) => console.log(err.message));
}, []);

  return (

    <Row>
      <h1 style={{ color: "blue", fontWeight: "bolder" }}>Latest Post</h1>
      {latest.length > 0 ? (
        latest.map((l) => (
          <Col md={3} key={l._id} className="mb-3">
            <div className="card p-2">

              {/* IMAGE */}
              <img
                src={`http://localhost:3000/uploads/${l.advertismentimgid}`}
                alt="ad"
                style={{ height: "150px", objectFit: "cover" }}
              />

              {/* NAME */}
              <h5>{l.name}</h5>

              {/* DESCRIPTION */}
              <p>{l.description}</p>

              {/* PRICE */}
              <p><b>Price:</b> {l.price}</p>
              <Button
                variant="primary"
                onClick={() => navigate(`/details/${l._id}`)}
              >
                More Details
              </Button>

            </div>
          </Col>
        ))
      ) : (
        <p>No Post</p>

      )}
    </Row>
  );
};

export default LatestPost;
