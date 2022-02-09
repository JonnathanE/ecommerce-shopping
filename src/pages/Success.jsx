import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userRequest } from '../requestMethods';

export const Success = () => {

    const location = useLocation();
    const data = location.state.stripeData;
    const cart = location.state.products;
    const currentUser = useSelector(state => state.user.currentUser);
    const [orderId, setOrderId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const createOrder = async () => {
            try {
                const res = await userRequest.post("/orders", {
                    userId: currentUser._id,
                    products: cart.products.map((item) => ({
                        productId: item._id,
                        quantity: item._quantity,
                    })),
                    amount: cart.total,
                    address: data.billing_details.address,
                });
                setOrderId(res.data._id);
            } catch (error) {
                console.log(error);
            }
        };
        data && createOrder();
    }, [cart, data, currentUser]);


    const onClickHome = () => {
        navigate('/');
    }

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {orderId
                ? `Order has been created successfully. Your order number is ${orderId}`
                : `Successfull. Your order is being prepared...`}
            <button style={{ padding: 10, marginTop: 20 }} onClick={onClickHome}>Go to Homepage</button>
        </div>
    )
}
