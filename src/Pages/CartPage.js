import React from "react";
// import TotalSidebar from "../Component/TotalSidebar/TotalSidebar";
import "./CartPage.css";
import { ListGroup, Row, Col, Image, Form, Button } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import useCustomContext from "../Hooks/UseCustomContext";
// import "./CartSection.css";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, saveForLater, dispatchCart, dispatchSaveForLater } =
    useCustomContext();
  const totalAmount = cart?.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
  const totalDiscountedAmount = cart?.reduce(
    (acc, curr) => acc + (curr.discountedPrice - curr.price) * curr.quantity,
    0
  );
  const cartQuantity = cart.reduce(
    (acc, item) => acc + Number(item.quantity),
    0
  );

  return (
    <div className="cartpage-section">
      <div
        style={{
          // marginTop: "5.5rem",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-between",
          marginTop: "6.5rem",
        }}
      >
        <h2
          style={{ display: "block", width: "100%", padding: "1rem 0 0 1rem" }}
        >
          My Cart - {cartQuantity} Items
        </h2>
        <div className="columnBox">
          <div className="cart__container">
            <ListGroup>
              {cart.length === 0 && (
                <h1 style={{ width: "100%", textAlign: "center" }}>
                  Cart Is Empty
                </h1>
              )}
              {cart.map((product) => (
                <ListGroup.Item key={product.id}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={2}>
                      <span>{product.name}</span>
                    </Col>
                    <Col md={2}>
                      <h4 className="price-tag">₹{product.price}</h4>
                      <span className="price-discountedPrice">
                        ₹ {product.discountedPrice}
                      </span>
                      <span className="price-discountedPercentage">
                        {product.discountedPercentage} % Off
                      </span>
                    </Col>
                    <Col md={2}>
                      <Form.Select
                        value={product.quantity}
                        onChange={(event) =>
                          dispatchCart({
                            type: "CHANGE_CART_QTY",
                            payload: {
                              id: product.id,
                              quantity: Number(event.target.value),
                            },
                          })
                        }
                      >
                        {[...Array(10)].map((data, idx) => (
                          <option key={idx + 1}>{idx + 1}</option>
                        ))}
                      </Form.Select>
                      {/* <Form.Control
                    as="select"
                    value={product.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: product.id,
                          qty: e.target.value,
                        },
                      })
                    }
                  >
                    {[...Array(prod.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control> */}
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() =>
                          dispatchCart({
                            type: "REMOVE_FROM_CART",
                            payload: product.id,
                          })
                        }
                      >
                        <AiFillDelete fontSize="20px" />
                      </Button>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="success"
                        onClick={() => {
                          dispatchSaveForLater({
                            type: "ADD_TO_SAVECART",
                            payload: product,
                          });
                          dispatchCart({
                            type: "REMOVE_FROM_CART",
                            payload: product.id,
                          });
                        }}
                      >
                        Save For Later
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
              <Link className="goback__btn" to="/">
                {cart.length === 0 ? "Go Back to Home Page" : " Add More Items"}
              </Link>
              <Button
                variant="primary"
                style={{ fontWeight: "800" }}
                disabled={cart.length === 0}
              >
                {cart.length === 0 ? "Cart is Empty" : " Confirm Order"}
              </Button>
            </ListGroup>
          </div>
          {saveForLater.length !== 0 && (
            <h2
              style={{
                display: "block",
                width: "100%",
                padding: "1rem 0 0 1rem",
              }}
            >
              Save For Later -{" "}
              {saveForLater.reduce(
                (acc, item) => acc + Number(item.quantity),
                0
              )}{" "}
              Items
            </h2>
          )}
          <div className="cart__container">
            <ListGroup>
              {saveForLater.map((product) => (
                <ListGroup.Item key={`$SaveLater-${product.id}`}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={2}>
                      <span>{product.name}</span>
                    </Col>
                    <Col md={2}>
                      <h4 className="price-tag">₹{product.price}</h4>
                      <span className="price-discountedPrice">
                        ₹ {product.discountedPrice}
                      </span>
                      <span className="price-discountedPercentage">
                        {product.discountedPercentage} % Off
                      </span>
                    </Col>
                    <Col md={2}>
                      <Form.Select
                        value={product.quantity}
                        onChange={(event) =>
                          dispatchSaveForLater({
                            type: "CHANGE_SAVECART_QTY",
                            payload: {
                              id: product.id,
                              quantity: Number(event.target.value),
                            },
                          })
                        }
                      >
                        {[...Array(10)].map((data, idx) => (
                          <option key={idx + 1}>{idx + 1}</option>
                        ))}
                      </Form.Select>
                      {/* <Form.Control
                    as="select"
                    value={product.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: product.id,
                          qty: e.target.value,
                        },
                      })
                    }
                  >
                    {[...Array(prod.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control> */}
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() =>
                          dispatchSaveForLater({
                            type: "REMOVE_FROM_SAVECART",
                            payload: product.id,
                          })
                        }
                      >
                        <AiFillDelete fontSize="20px" />
                      </Button>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="primary"
                        onClick={() => {
                          dispatchCart({
                            type: "ADD_TO_CART",
                            payload: product,
                          });
                          dispatchSaveForLater({
                            type: "REMOVE_FROM_SAVECART",
                            payload: product.id,
                          });
                        }}
                      >
                        Add to Cart
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </div>
        <div className="cartSidebar__section">
          <h1 className="cartSidebar__title">PRICE DETAILS</h1>
          <hr />
          <span style={{ margin: ".5rem 0" }} className="title">
            Subtotal ({cart.length}) items
          </span>
          {cart.length > 0 && (
            <div className="cartSidebar__priceInfo">
              <hr />
              {cart?.map((product, idx) => (
                <span style={{ display: "block" }} key={idx}>
                  {product.name}
                  <br />(<span> ₹ {product.discountedPrice} </span>
                  <strong>X</strong>
                  <span> {product.quantity} </span>)
                </span>
              ))}
              <hr />
            </div>
          )}
          <h4>
            Total Discount {"      "}
            <span style={{ color: "#26a541" }}>
              {" "}
              - ₹{totalDiscountedAmount}
            </span>
          </h4>
          <hr />
          <h3 style={{ fontWeight: "bolder", fontSize: "1.5rem" }}>
            Total: ₹ {totalAmount}
          </h3>
          <br />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
