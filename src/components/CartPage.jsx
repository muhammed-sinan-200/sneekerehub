import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";

const CartPage = () => {
  const { cartItems, addToCart, decreaseQuantity } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (total, item) => total + (Number(item.price) || 0) * (item.quantity || 0),
    0
  );

  return (
    <Container
      fluid="md"
      className="py-5"
      style={{
        minHeight: "90vh",
        backgroundColor: "#f5f7fa",
      }}
    >
      <div className="text-center mb-5">
        <p className="text-muted">Review your items and complete your purchase</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
            alt="empty-cart"
            width="140"
            className="mb-4 opacity-75"
          />
          <h5 className="text-muted mb-2">Your cart is empty 🛒</h5>
          <p className="text-secondary">Start shopping to fill it up!</p>
        </div>
      ) : (
        <Row className="justify-content-center">
          <Col md={8} lg={7}>
            <Card
              className="border-0 shadow-sm rounded-4 mb-4 p-3"
              style={{
                background: "#fff",
                borderRadius: "16px",
              }}
            >
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`d-flex flex-wrap align-items-center justify-content-between py-3 ${
                    index !== cartItems.length - 1 ? "border-bottom" : ""
                  }`}
                  style={{
                    transition: "background 0.3s ease",
                  }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <Image
                      src={item.img}
                      alt={item.name}
                      rounded
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
                      }}
                    />
                    <div>
                      <h5 className="fw-semibold mb-1">{item.name}</h5>
                      <p className="text-muted small mb-1">
                        Size: UK {item.selectedSize}
                      </p>
                      <h6 className="fw-bold text-dark mb-0">
                        $ {item.price}
                      </h6>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3 mt-3 mt-md-0">
                    <Button
                      variant="light"
                      size="sm"
                      className="rounded-circle border"
                      style={{
                        width: "36px",
                        height: "36px",
                        lineHeight: "1.2",
                      }}
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      –
                    </Button>
                    <span className="fw-semibold fs-5">{item.quantity}</span>
                    <Button
                      variant="light"
                      size="sm"
                      className="rounded-circle border"
                      style={{
                        width: "36px",
                        height: "36px",
                        lineHeight: "1.2",
                      }}
                      onClick={() => addToCart(item)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              ))}
            </Card>
          </Col>

          <Col md={4} lg={3}>
            <Card
              className="border-0 shadow rounded-4 sticky-top p-4"
              style={{
                top: "90px",
                background: "#ffffff",
                zIndex:"1"
              }}
            >
              <div className="text-center mb-4">
                <h5 className="fw-bold">Order Summary</h5>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Subtotal</span>
                <span className="fw-semibold">$ {totalPrice.toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Shipping</span>
                <span className="fw-semibold text-success">Free</span>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4 border-top pt-3">
                <h5 className="fw-bold">Total</h5>
                <h5 className="fw-bold text-success">
                  $ {totalPrice.toFixed(2)}
                </h5>
              </div>

              <Button
                variant="dark"
                size="lg"
                className="w-100 rounded-4 py-2 fw-semibold shadow-sm"
                onClick={() => alert("Your order is placed")}
                style={{
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#343a40";
                  e.target.style.transform = "scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#000";
                  e.target.style.transform = "scale(1)";
                }}
              >
                 Checkout
              </Button>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CartPage;
