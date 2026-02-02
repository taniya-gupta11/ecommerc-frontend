// src/pages/CheckoutPage.jsx
import { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cart, totalPrice, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    payment: "credit-card",
  });

  const [errors, setErrors] = useState({});

  if (cart.length === 0) {
    return <p>Your cart is empty. Go back to <a href="/">shopping</a>.</p>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone))
      newErrors.phone = "Valid 10-digit phone required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    alert("Order placed successfully!");
    setCart([]); // clear cart
    localStorage.removeItem("cart"); // clear localStorage
    navigate("/"); // redirect to Home
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Checkout</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>

        <div>
          <label>Address:</label>
          <textarea name="address" value={form.address} onChange={handleChange} />
          {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}
        </div>

        <div>
          <label>Phone:</label>
          <input type="text" name="phone" value={form.phone} onChange={handleChange} />
          {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
        </div>

        <div>
          <label>Payment Method:</label>
          <select name="payment" value={form.payment} onChange={handleChange}>
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="cod">Cash on Delivery</option>
          </select>
        </div>

        <h3>Order Summary</h3>
        {cart.map((item) => (
          <div key={item.id} style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{item.title} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <h3>Total: ${totalPrice.toFixed(2)}</h3>

        <button type="submit" style={{ marginTop: "1rem" }}>Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
