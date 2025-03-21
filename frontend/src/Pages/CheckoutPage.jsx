import React from "react";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:8080/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cart }),
            });
    
            const data = await response.json();
    
            if (!data.sessionUrl) {
                throw new Error("Invalid session URL");
            }
    
            console.log("Redirecting to:", data.sessionUrl);
            window.location.href = data.sessionUrl;
        } catch (error) {
            console.error("Error processing checkout:", error);
            alert("Something went wrong! Please try again.");
        }
    };
    

    return (
        <div className="checkout-container">
            <h1 className="checkout-title">Checkout</h1>

            {cart.length === 0 ? (
                <p className="empty-cart-message">Your cart is empty.</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cart.map((item, index) => (
                            <div key={index} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h3>{item.name}</h3>
                                    <p>Price: ${item.price.toFixed(2)}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="checkout-actions">
                        <button onClick={handleCheckout} className="checkout-button">
                            Pay Now
                        </button>
                        <button onClick={clearCart} className="clear-cart-button">
                            Clear Cart
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CheckoutPage;
