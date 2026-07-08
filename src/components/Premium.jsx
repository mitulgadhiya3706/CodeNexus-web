import React from 'react'
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useSelector } from 'react-redux';

const Premium = () => {
    const user = useSelector((store) => store.user);
    const membershipType = user?.membershipType || "None";

    const verifyPremium = async (response) => {
        try {
            await axios.post(
                BASE_URL + "/payment/verify",
                {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                },
                { withCredentials: true }
            );
            alert("Congratulations! Premium Activated");
            window.location.reload();
        } catch (err) {
            console.error("Payment verification failed:", err?.response?.data || err.message);
            alert("Payment succeeded but activation failed. Please contact support with your payment ID: " + response.razorpay_payment_id);
        }
    };

    const handleBuyClick = async (type) => {
        const order = await axios.post(
            BASE_URL + "/payment/create",
            { membershipType: type },
            { withCredentials: true }
        );

        const { amount, keyId, currency, notes, orderId } = order.data;
        const options = {
            key: keyId,
            amount,
            currency,
            name: "CodeNexus",
            description: "Premium Membership",
            order_id: orderId,
            prefill: {
                name: notes.firstName + " " + notes.lastName,
                // email: notes.emailId,
            },
            theme: {
                color: "#3399cc",
            },
            handler: verifyPremium,
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    }


    return (
        <div className='m-20'>
            <div className="flex w-full flex-col lg:flex-row">
                <div className="card bg-base-300 rounded-box grid h-80 grow place-content-center gap-4">
                    <h1 className='text-2xl font-bold'>Silver Membership</h1>
                    <ul className='mt-2 space-y-1'>
                        <li>- Chat with other people</li>
                        <li>- 100 connection Requests per day</li>
                        <li>- Blue Tick</li>
                        <li>- 3 months</li>
                    </ul>
                    <button className=" btn bg-amber-50 text-black mt-6 w-full sm:w-auto"
                        onClick={() => handleBuyClick("silver")}>
                        {membershipType === "silver" ? "Already Silver" : "Choose Silver"}
                    </button>
                </div>
                <div className="divider lg:divider-horizontal">OR</div>
                <div className="card bg-base-300 rounded-box grid h-80 grow place-content-center gap-4">
                    <h1 className='text-2xl font-bold'>Gold Membership</h1>
                    <ul className='mt-2 space-y-1'>
                        <li>- Chat with other people</li>
                        <li>- Infinite connection Requests per day</li>
                        <li>- Blue Tick</li>
                        <li>- 6 months</li>
                    </ul>
                    <button className=" btn bg-amber-400 text-black mt-6 w-full sm:w-auto"
                        onClick={() => handleBuyClick("gold")}>
                        {membershipType === "silver" ? "Upgrade to Gold" : "Choose Gold"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Premium