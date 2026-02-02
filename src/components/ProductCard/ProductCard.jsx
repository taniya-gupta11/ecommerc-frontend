import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext.jsx";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav style={{ display:"flex", justifyContent:"space-between", padding:"1rem", background:"#1976d2", color:"white"}}>
      <Link to="/" style={{ color:"white", fontWeight:"bold" }}>My E-Commerce</Link>
      <div style={{ display:"flex", gap:"1rem" }}>
        <Link to="/" style={{ color:"white" }}>Home</Link>
        <Link to="/cart" style={{ color:"white", position:"relative" }}>
          Cart
          {cartCount > 0 && <span style={{position:"absolute", top:"-8px", right:"-10px", background:"red", borderRadius:"50%", padding:"2px 6px", fontSize:"0.8rem"}}>{cartCount}</span>}
        </Link>
        <Link to="/login" style={{ color:"white" }}>Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
