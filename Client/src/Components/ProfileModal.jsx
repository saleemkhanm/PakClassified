
import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

const ProfileModal = ({ show, handleClose, user, onUpdate }) => {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    dob: "",
  });

  const [image, setImage] = useState(null);

  //  LOAD USER INTO FORM
  useEffect(() => {
    if (!user) return;

    setForm({
      name: user.name || "",
      contact: user.contact || "",
      dob: user.dob || "",
    });
  }, [user]);

  // ✅ UPDATE PROFILE
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("contact", form.contact);
      formData.append("dob", form.dob);

      if (image) {
        formData.append("image", image);
      }

      const res = await fetch(
        `http://localhost:3000/api/v1/user/${user._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await res.json();

      // ✅ ALWAYS RETURN SAME FORMAT
      const updatedUser = data.user || data;

      onUpdate(updatedUser);

      handleClose();
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Profile</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Control
            className="mb-2"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <Form.Control
            className="mb-2"
            placeholder="Contact"
            value={form.contact}
            onChange={(e) =>
              setForm({ ...form, contact: e.target.value })
            }
          />

          <Form.Control
            type="date"
            className="mb-2"
            value={form.dob}
            onChange={(e) =>
              setForm({ ...form, dob: e.target.value })
            }
          />

          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="success" onClick={handleSubmit}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileModal;