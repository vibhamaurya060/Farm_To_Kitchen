import React, { useEffect } from "react";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
    const { clearCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        clearCart();
    }, []);

    return (
        <div className="p-6 text-center">
            <h1 className="text-3xl font-bold text-green-500 mb-4">Payment Successful!</h1>
            <p>Your order has been placed successfully.</p>
            <button onClick={() => navigate("/")} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
                Continue Shopping
            </button>
        </div>
    );
};

export default SuccessPage;
