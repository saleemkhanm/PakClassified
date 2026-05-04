
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const PostModal = ({ show, handleClose, editData }) => {
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

  // LOAD DROPDOWNS
  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/category")
      .then(res => setCategories(res.data));

    axios.get("http://localhost:3000/api/v1/cityarea")
      .then(res => setCity(res.data));

    axios.get("http://localhost:3000/api/v1/type")
      .then(res => setType(res.data.advertismentType || []));
  }, []);

  // PREFILL DATA WHEN EDIT
  useEffect(() => {
    if (editData) {
      reset({
        name: editData.name,
        price: editData.price,
        description: editData.description,
        feature: editData.feature,
        starton: editData.starton?.slice(0, 10),
        endon: editData.endon?.slice(0, 10),
        cityareaid: editData.cityareaid?._id || editData.cityareaid,
        advertismenttypeid: editData.advertismenttypeid?._id || editData.advertismenttypeid,
        advertismentcategory: editData.advertismentcategory?._id || editData.advertismentcategory,
      });
    } else {
      reset(); // for new post
    }
  }, [editData, reset]);

  //  SUBMIT (CREATE + UPDATE)
  const formSubmit = async (data) => {
    try {
      if (!user || !user._id) {
        alert("Login required");
        return;
      }

      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      formData.append("userid", user._id);

      if (imageFile) {
        formData.append("advertismentimg", imageFile);
      }

      const token = localStorage.getItem("token");

      // MAIN FIX: CONDITION
      if (editData) {
        // UPDATE
        await axios.put(
          `http://localhost:3000/api/v1/advertisment/${editData._id}`,
          data, //  no formData needed unless image updating
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Updated Successfully");
      } else {
        // CREATE
        await axios.post(
          "http://localhost:3000/api/v1/advertisment",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Created Successfully");
      }

      handleClose();
      reset();

    } catch (error) {
      console.log(error);
      alert("Error occurred");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {editData ? "Update Advertisement" : "Post Advertisement"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(formSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control {...register("name", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" {...register("price", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" {...register("description")} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Features</Form.Label>
            <Form.Control as="textarea" {...register("feature")} />
          </Form.Group>

          <Row>
            <Col>
              <Form.Control type="date" {...register("starton")} />
            </Col>
            <Col>
              <Form.Control type="date" {...register("endon")} />
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


          {/* IMAGE OPTIONAL IN UPDATE */}
          {!editData && (
            <Form.Control
              type="file"
              className="mt-3"
              onChange={(e) => setImageFile(e.target.files[0])}
              required
            />
          )}

          <Button type="submit" className="mt-3">
            {editData ? "Update" : "Post Advertisement"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PostModal;