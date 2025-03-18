import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Navbar, Nav, Badge, Offcanvas, ListGroup, Dropdown } from "react-bootstrap";
import { motion, useAnimation } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCart, setShowCart] = useState(false);
  const [likes, setLikes] = useState({});
  const [loading, setLoading] = useState(true);
  const controls = useAnimation();

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });

    axios.get("https://fakestoreapi.com/products/categories")
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  // Add product to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
    controls.start({ scale: [1, 1.2, 1], transition: { duration: 0.5 } });
  };

  // Remove product from cart
  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  // Toggle Like/Unlike
  const toggleLike = (id) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: !prevLikes[id]
    }));
  };

  // Filter products by category
  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" bg="dark" variant="dark" className="shadow">
        <Container>
          <Navbar.Brand href="#">🛍️ MyShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">Products</Nav.Link>
              <Nav.Link href="#">Categories</Nav.Link>
              <Nav.Link href="#">Contact</Nav.Link>
              <Nav.Link onClick={() => setShowCart(true)} className="position-relative" style={{ cursor: "pointer" }}>
                <motion.div animate={controls}>
                  <i className="bi bi-cart3"></i> Cart
                  {cart.length > 0 && (
                    <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                      {cart.length}
                    </Badge>
                  )}
                </motion.div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Offcanvas Cart Sidebar */}
      <Offcanvas show={showCart} onHide={() => setShowCart(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Cart 🛒</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cart.length === 0 ? (
            <p className="text-center">Cart is empty.</p>
          ) : (
            <ListGroup>
              {cart.map((item, index) => (
                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                  <img src={item.image} alt={item.title} style={{ width: "50px", height: "50px", objectFit: "contain" }} />
                  <div className="flex-grow-1 ms-3">
                    <p className="mb-1">{item.title.substring(0, 25)}...</p>
                    <p className="mb-1 text-muted">₹{item.price}</p>
                  </div>
                  <Button variant="danger" size="sm" onClick={() => removeFromCart(index)}>Remove</Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      {/* Animated Background */}
      <div className="animated-bg"></div>

      {/* Category Filter */}
      <Container className="py-4">
        <h2 className="text-center mb-4">Product Catalog</h2>
        <Dropdown className="mb-3 text-center">
          <Dropdown.Toggle variant="primary">
            {selectedCategory === "all" ? "All Categories" : selectedCategory}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSelectedCategory("all")}>All Categories</Dropdown.Item>
            {categories.map((category, index) => (
              <Dropdown.Item key={index} onClick={() => setSelectedCategory(category)}>
                {category}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        {/* Product Grid */}
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary"></div>
          </div>
        ) : (
          <Row>
            {filteredProducts.map(product => (
              <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <motion.div whileHover={{ scale: 1.05 }} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <Card className="shadow-lg h-100">
                    <Card.Img variant="top" src={product.image} className="p-3" style={{ height: "200px", objectFit: "contain" }} />
                    <Card.Body>
                      <Card.Title>{product.title.substring(0, 30)}...</Card.Title>
                      <Card.Text>₹{product.price}</Card.Text>
                      <Button variant="primary" onClick={() => addToCart(product)}>
                        <i className="bi bi-cart-plus"></i> Add to Cart
                      </Button>
                      <motion.button 
                        className="btn btn-light ms-2" 
                        whileTap={{ scale: 0.9 }} 
                        onClick={() => toggleLike(product.id)}
                      >
                        <i className={`bi ${likes[product.id] ? "bi-heart-fill text-danger" : "bi-heart"}`}></i>
                      </motion.button>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* CSS for Animated Background */}
      <style>
        {`
          .animated-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: radial-gradient(circle, rgba(255, 0, 150, 0.2) 10%, rgba(0, 255, 255, 0.2) 40%);
            z-index: -1;
            animation: moveBg 10s infinite linear;
          }

          @keyframes moveBg {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-50px) rotate(180deg); }
            100% { transform: translateY(0px) rotate(360deg); }
          }
        `}
      </style>
    </>
  );
};

export default App;
