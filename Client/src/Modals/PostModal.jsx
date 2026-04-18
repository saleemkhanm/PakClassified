import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const PostModal = ({ show, handleClose }) => {

  // ✅ Redux user (CORRECT PLACE)
  const user = useSelector((state) => state.user.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [categories, setCategories] = useState([]);
  const [city, setCity] = useState([]);
  const [type, setType] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/category")
      .then(res => setCategories(res.data))
      .catch(err => console.log(err));

    axios.get("http://localhost:3000/api/v1/cityarea")
      .then(res => setCity(res.data))
      .catch(err => console.log(err));

    axios.get("http://localhost:3000/api/v1/type")
      .then(res => setType(res.data.advertismentType))
      .catch(err => console.log(err));
  }, []);

  // ✅ FORM SUBMIT
  const formSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("feature", data.feature);
      formData.append("starton", data.starton);
      formData.append("endon", data.endon);
      formData.append("cityareaid", data.cityareaid);
      formData.append("advertismenttypeid", data.advertismenttypeid);
      formData.append("advertismentcategory", data.advertismentcategory);
      formData.append("advertismentstatusid", data.advertismentstatusid);
      formData.append("advertismentimg", imageFile);

      // ✅ SAFE USER ID
      if (!user) {
        alert("Please login first");
        return;
      }

      formData.append("userid", user._id);

     const token = localStorage.getItem("token");

// append your fields...

axios.post(
  "http://localhost:3000/api/v1/advertisment",
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  }
);

      alert("Advertisement Posted Successfully");
      reset();
      handleClose();

    } catch (error) {
      console.error(error.response?.data || error);
      alert("Error while posting advertisement");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-success fw-bolder">
          Post Advertisement
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(formSubmit)}>

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control {...register("name", { required: "Name is required" })} />
            {errors.name && <div className="text-danger">{errors.name.message}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" {...register("price", { required: "Price is required" })} />
            {errors.price && <div className="text-danger">{errors.price.message}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={2} {...register("description", { required: "Description is required" })} />
            {errors.description && <div className="text-danger">{errors.description.message}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Features</Form.Label>
            <Form.Control as="textarea" rows={2} {...register("feature", { required: "Features is required" })} />
            {errors.feature && <div className="text-danger">{errors.feature.message}</div>}
          </Form.Group>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Starts On</Form.Label>
                <Form.Control type="date" {...register("starton", { required: "Required" })} />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Ends On</Form.Label>
                <Form.Control type="date" {...register("endon", { required: "Required" })} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select {...register("advertismentcategory", { required: "Required" })}>
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3">
                <Form.Label>City Area</Form.Label>
                <Form.Select {...register("cityareaid", { required: "Required" })}>
                  <option value="">Select City</option>
                  {city.map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Select {...register("advertismenttypeid", { required: "Required" })}>
                  <option value="">Select Type</option>
                  {type.map(t => (
                    <option key={t._id} value={t._id}>{t.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImageFile(e.target.files[0])}
              required
            />
          </Form.Group>

          <Button variant="success" type="submit">
            Post Advertisement
          </Button>

        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PostModal;