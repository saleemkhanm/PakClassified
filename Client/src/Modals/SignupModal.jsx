
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const SignupModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    firstname: { value: "", error: "", valid: false },
    lastname: { value: "", error: "", valid: false },
    email: { value: "", error: "", valid: false },
    password: { value: "", error: "", valid: false },
    contact: { value: "", error: "", valid: false },

    dob: { value: "", error: "", valid: true },
    securityquestions: { value: "", error: "", valid: true },
    securityanswers: { value: "", error: "", valid: true },
    adress: { value: "", error: "", valid: true },

    // roleid: { value: "2", error: "", valid: true },
    img: { value: null, error: "", valid: true },
  });

  const handleChange = (field, value) => {
    let isValid = value.trim() !== "";
    let error = isValid ? "" : "This field is required";

    if (field === "firstname" || field === "lastname") {
      isValid = value.trim().length >= 3 && value.trim().length <= 30;
      error = isValid ? "" : "3–30 characters required";
    }

    if (field === "email") {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = regex.test(value);
      error = isValid ? "" : "Invalid email";
    }

    if (field === "password") {
      isValid = value.length >= 6;
      error = isValid ? "" : "Minimum 6 characters";
    }

    if (field === "contact") {
      const regex = /^03[0-9]{9}$/;
      isValid = regex.test(value);
      error = isValid ? "" : "Invalid phone number";
    }

    setFormData((prev) => ({
      ...prev,
      [field]: { value, error, valid: isValid },
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      img: { value: file, error: "", valid: true },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = Object.values(formData).every((f) => f.valid);
    if (!isValid) {
      alert("Please fix all validation errors");
      return;
    }

    const data = new FormData();
    data.append("firstname", formData.firstname.value);
    data.append("lastname", formData.lastname.value);
    data.append("email", formData.email.value);
    data.append("password", formData.password.value);
    data.append("contact", formData.contact.value);
    data.append("dob", formData.dob.value);
    data.append("securityquestions", formData.securityquestions.value);
    data.append("securityanswers", formData.securityanswers.value);
    data.append("adress", formData.adress.value);
    // data.append("roleid", formData.roleid.value);

    if (formData.img.value) {
      data.append("img", formData.img.value);
    }

    try {
      const res = await fetch("http://localhost:3000/api/v1/user/signup", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message);
        return;
      }

      alert("Signup Successful");
      handleClose();
    } catch (err) {
      alert("Network Error");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Control placeholder="First Name"
              value={formData.firstname.value}
              onChange={(e) => handleChange("firstname", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control placeholder="Last Name"
              value={formData.lastname.value}
              onChange={(e) => handleChange("lastname", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control placeholder="Email"
              value={formData.email.value}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control type="password" placeholder="Password"
              value={formData.password.value}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control placeholder="03XXXXXXXXX"
              value={formData.contact.value}
              onChange={(e) => handleChange("contact", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control type="date"
              value={formData.dob.value}
              onChange={(e) => handleChange("dob", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control placeholder="Security Question"
              value={formData.securityquestions.value}
              onChange={(e) => handleChange("securityquestions", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control placeholder="Security Answer"
              value={formData.securityanswers.value}
              onChange={(e) => handleChange("securityanswers", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control placeholder="Address"
              value={formData.adress.value}
              onChange={(e) => handleChange("adress", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control type="file" onChange={handleImageChange} />
          </Form.Group>

          <Button type="submit">Sign Up</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignupModal;
