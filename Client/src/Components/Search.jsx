import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const Search = () => {
  const [categories, setCategories] = useState([]);
  const [city, setCity] = useState([]);
  const [keyword, setKeyword] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [results, setResults] = useState([]);

  // GET categories & city
  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/category")
      .then(res => setCategories(res.data))
      .catch(err => console.log(err));

    axios.get("http://localhost:3000/api/v1/cityarea")
      .then(res => setCity(res.data))
      .catch(err => console.log(err));
  }, []);

  // SEARCH FUNCTION
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get("http://localhost:3000/api/v1/advertisment/search", {
        params: {
          keyword,
          category: selectedCategory,
          city: selectedCity,
        },
      });

      console.log("RESULT:", res.data);
      setResults(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container fluid className="mt-4 px-0">

      {/* SEARCH FORM */}
      <Form onSubmit={handleSearch}>
        <Row className="bg-success p-4 g-3 align-items-center mx-0">

          {/* KEYWORD */}
          <Col>
            <Form.Control
              placeholder="Keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </Col>

          {/* CATEGORY */}
          <Col>
            <Form.Select onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">Select Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
          </Col>

          {/* CITY */}
          <Col>
            <Form.Select onChange={(e) => setSelectedCity(e.target.value)}>
              <option value="">Select City Area</option>
              {city.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </Form.Select>
          </Col>

          {/* BUTTON */}
          <Col>
            <Button type="submit" className="w-100 bg-dark text-white">
              <FaSearch className="me-2" />
              Search
            </Button>
          </Col>

        </Row>
      </Form>

      {/* RESULTS */}
      <Row className="mt-4">
        {results.length > 0 ? (
          results.map((item) => (
            <Col md={3} key={item._id} className="mb-3">
              <div className="card p-2">
                <img
                  src={`http://localhost:3000/uploads/${item.advertismentimgid}`}
                  style={{ height: "150px", objectFit: "cover" }}
                />
                <h5>{item.name}</h5>
                <p>{item.price}</p>
              </div>
            </Col>
          ))
        ) : (
          <p className="text-center mt-3">No Results</p>
        )}
      </Row>

    </Container>
  );
};

export default Search;