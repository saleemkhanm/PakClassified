import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
export const AdvertisementCards = ({ items }) => {

  console.log(`card page ${items}`)
  // if (!items) return null; // Skip if items is undefined
const navigate=useNavigate();
  return (

    <Card style={{ width: '18rem', marginTop: "20px" }} onClick={()=>{navigate(`/category/${items._id}`)}} >
      <Card.Img
        src={items.img || "/placeholder.jpg"} // fallback image
        alt={items.name || "No name"}
        style={{ objectFit: "cover", width: "250px", height: "100%" }}
      />

      <Card.Body>
        <Card.Text>
          <Card.Title className=" fw-bolder">
            <h4> {items.name || "No Name"}</h4>
          </Card.Title>
          <h5 className="text-success">3 Cars</h5>
          <Button variant="primary">More Details</Button>

        </Card.Text>
      </Card.Body>
    </Card> 


)};
