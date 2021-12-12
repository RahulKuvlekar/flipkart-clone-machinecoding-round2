import React from "react";
// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
// import Form from "react-bootstrap/Form";
// import FormControl from "react-bootstrap/FormControl";
import { Badge, Button } from "react-bootstrap";
import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import useCustomContext from "../../Hooks/UseCustomContext";
import { AiFillDelete } from "react-icons/ai";
import "./Header.css";

const Header = () => {
  const { cart, dispatchCart } = useCustomContext();
  const cartQuantity = cart.reduce(
    (acc, item) => acc + Number(item.quantity),
    0
  );
  return (
    <nav className="navbar__section">
      <Link
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "2.5rem",
          fontWeight: "bolder",
        }}
      >
        Flipkart Clone 🚀
      </Link>
      <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          <MdShoppingCart fontSize="2rem" />
          {cart?.length > 0 && <Badge bg="danger">{cartQuantity}</Badge>}
        </Dropdown.Toggle>

        <Dropdown.Menu
          style={{
            minWidth: 350,
            maxHeight: 500,
            overflowY: "scroll",
            overflowX: "hidden",
            paddingBottom: "0",
            backgroundColor: "white",
          }}
        >
          {cart.length > 0 ? (
            <>
              {cart.map((product, idx) => (
                <span className="cartitem" key={product.id}>
                  <img
                    src={product.image}
                    className="cartItem__img"
                    alt={product.name}
                  />
                  <div className="cartItem__details">
                    <span>{product.name}</span>
                    <span>
                      <b>
                        ₹ {product.price} X Qty-{product.quantity}
                      </b>
                    </span>
                  </div>
                  <AiFillDelete
                    fontSize="20px"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      dispatchCart({
                        type: "REMOVE_FROM_CART",
                        payload: product.id,
                      });
                    }}
                  />
                </span>
              ))}

              <Link
                to="/CartPage"
                style={{
                  backgroundColor: "white",
                }}
              >
                <Button
                  style={{
                    width: "95%",
                    margin: "0 10px",
                    position: "sticky",
                    bottom: 0,
                    left: 0,
                    fontWeight: "900",
                  }}
                >
                  Go To Cart
                </Button>
              </Link>
            </>
          ) : (
            <span style={{ padding: 10, fontWeight: "800", color: "red" }}>
              Cart is Empty!
            </span>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </nav>
  );
};

export default Header;
