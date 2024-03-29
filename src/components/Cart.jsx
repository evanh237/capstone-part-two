import CartItemCard from "./CartItemCard";
import { useEffect, useState } from "react";
import "./Cart.css";
const Cart = ({ cart, products, setCart, resetCart, token }) => {
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const total = cart?.reduce(
      (acc, item) => {
        const productItem = getCartItemDetails(item);
        return acc + (productItem ? productItem.price * item.quantity : 0);
      },

      0
    );

    setCartTotal(total?.toFixed(2));
  }, [cart, products]);

  const getCartItemDetails = (cartItem) =>
    products.find((product) => product.id === cartItem.productId);

  const handleIncrement = (productId, quantityToAdd) => {
    const updatedCart = cart.map((item) => {
      if (item.productId === productId) {
        return {
          ...item,
          quantity: item.quantity + quantityToAdd,
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleDecrement = (productId, quantityToSubtract) => {
    const updatedCart = cart.map((item) => {
      if (item.productId === productId) {
        const newQuantity = item.quantity - quantityToSubtract;
        const updatedQuantity = Math.max(newQuantity, 0);
        return {
          ...item,
          quantity: updatedQuantity,
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleDeleteItem = (productId) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setCart(updatedCart);
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleCheckout = () => {
    const queryParams = new URLSearchParams();
    queryParams.append("cart", JSON.stringify(cart));
    queryParams.append("cartTotal", cartTotal);
    window.location.href = `/checkout?${queryParams.toString()}`;
  };

  return (
    <div>
      <h1>Shopping Cart</h1>

      {!token ? (
        <h4>Please log in to view your cart!</h4>
      ) : cart.length === 0 ? (
        <h4>Your Cart is Empty!</h4>
      ) : (
        <div>
          {cart.map((item) => {
            const productItem = getCartItemDetails(item);

            return (
              <CartItemCard
                key={productItem?.id}
                cartItem={productItem}
                quantity={item.quantity}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                onDelete={handleDeleteItem}
              />
            );
          })}
          <div>Cart Total: ${cartTotal}</div>
          <button className="cart-btn" onClick={handleClearCart}>
            Clear Cart
          </button>
          <button
            className="cart-btn"
            onClick={handleCheckout}
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
