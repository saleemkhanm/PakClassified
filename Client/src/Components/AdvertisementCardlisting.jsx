
// import { useState, useEffect } from "react";
// import { AdvertisementCards } from './AdvertisementCards'
// import { Row, Col } from "react-bootstrap";

// const AdvertisementCardlisting = () => {
//     const [category, setCategory] = useState([]);

//     useEffect(() => {
//         fetch("http://localhost:3000/api/v1/category")
//             .then((response) => response.json())
//             .then((jsonData) => {
//                 console.log(jsonData);
//                 setCategory(jsonData);
//             })
//             .catch((err) => console.log(err.message));
//     }, []);

//     return (
//         <Row>
//             {category.length > 0 &&
//                 category.map((item, index) => (
//                     <Col key={index} md={12}>
//                         <AdvertisementCards items={item} />
//                     </Col>
//                 ))}
//         </Row>
//     );
// };

// export default AdvertisementCardlisting
import { useState, useEffect } from "react";
import { AdvertisementCards } from "./AdvertisementCards";
import { Row, Col } from "react-bootstrap";

const AdvertisementCardlisting = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/category")
      .then((res) => res.json())
      .then((data) => {
        console.log("API data:", data);
        // Make sure data is an array
        setCategories(Array.isArray(data) ? data : data.categories || []);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <Row>
      {categories.length > 0 ? (
        categories.map((item, index) => (
          <Col key={index} md={4} className="mb-4">
            <AdvertisementCards items={item} />
          </Col>
        ))
      ) : (
        <p>Loading cards...</p>
      )}
    </Row>
  );
};

export default AdvertisementCardlisting;
