import React from "react";
import "./ProductItem.css";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import UseCustomContext from "../../Hooks/UseCustomContext";

const ProductItem = ({ data }) => {
  const { cart, dispatchCart } = UseCustomContext();
  const [quantity, setQuantity] = React.useState(1);
  return (
    <div id={data.id} className="product_item">
      <img src={data.image} alt={data.name} />
      <div className="product_info">
        <h5>{data.name}</h5>
        <span>
          Size -
          {data.size?.length !== 0 ? (
            data.size.map((size, idx) => (
              <span id={`size-${idx}`} key={`size-${idx}`}>
                {size},{" "}
              </span>
            ))
          ) : (
            <span key={data.price}></span>
          )}
        </span>
        <h4 className="price-tag">
          Price - ₹{data.price}
          <span className="price-discountedPrice">₹{data.discountedPrice}</span>
          <span className="price-discountedPercentage">
            {data.discountedPercentage} % Off
          </span>
        </h4>
        <h5
          style={{
            margin: ".4rem 0",
          }}
        >
          Qty -{"   "}
          <Form.Select
            value={quantity}
            style={{
              display: "inline",
              width: "40%",
            }}
            onChange={(event) => {
              setQuantity(Number(event.target.value));
              dispatchCart({
                type: "CHANGE_CART_QTY",
                payload: {
                  id: data.id,
                  quantity: Number(event.target.value),
                },
              });
              setQuantity(event.target.value);
            }}
          >
            {/* {[...Array(product.inStock)].map((data, idx) => (
              <option key={idx + 1}>{idx + 1}</option>
            ))}  */}
            {[...Array(10)].map((data, idx) => (
              <option key={idx + 1}>{idx + 1}</option>
            ))}
          </Form.Select>
        </h5>
        {cart.some((cartItem) => cartItem.id === data.id) ? (
          <Button
            variant="danger"
            onClick={() => {
              dispatchCart({
                type: "REMOVE_FROM_CART",
                payload: data.id,
              });
              //   console.log("CART ==> ", cart);
              //   console.log("productList ==> ", products);
            }}
          >
            Remove From Cart
          </Button>
        ) : (
          <Button
            // disabled={product?.inStock === 0}
            variant="success"
            onClick={() => {
              dispatchCart({
                type: "ADD_TO_CART",
                payload: { ...data, quantity: quantity },
              });
              //   console.log("CART ==> ", cart);
              //   console.log("productList ==> ", products);
            }}
          >
            Add to Cart
            {/* {product?.inStock === 0 ? "Out Of Stcok" : "Add to Cart"} */}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
