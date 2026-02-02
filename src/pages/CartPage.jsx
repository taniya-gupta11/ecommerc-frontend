// src/pages/CartPage.jsx
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  // Handle empty cart
  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h2>Your Cart is Empty</h2>
        <Link to="/">
          <button style={{ padding: "0.5rem 1rem", marginTop: "1rem" }}>Go Shopping</button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h2>Your Cart</h2>

      {/* Cart Items */}
      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            style={{ width: "100px", height: "100px", objectFit: "contain" }}
          />
          <div style={{ flex: 1, minWidth: "150px" }}>
            <h4>{item.title}</h4>
            <p>${item.price.toFixed(2)}</p>
          </div>
          <div>
            <label>Qty:</label>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
              style={{ width: "60px", marginLeft: "0.5rem" }}
            />
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Remove
          </button>
        </div>
      ))}

      {/* Total & Checkout */}
      <div style={{ textAlign: "right", marginTop: "2rem" }}>
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <button
          onClick={() => navigate("/checkout")}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "1rem",
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
