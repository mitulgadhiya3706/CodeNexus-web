import React from 'react'
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useSelector } from 'react-redux';
import LottieImport from "lottie-react";
import TwinkleCrown from "../assets/TWINKLE CROWN!.json"

const Lottie = LottieImport?.default || LottieImport;

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

        <div className='m-10'>

            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold text-white tracking-tight">
                    Unlock Premium Access
                </h1>
                <p className="mt-1 mb-10 text-gray-400 leading-relaxed">
                    Get access to enhanced features and a better experience.
                </p>
            </div>

            <div className="flex max-w-4xl w-full mx-auto justify-center items-center gap-6 flex-col lg:flex-row">

                {/* Silver Card */}
                <div className="flex-1 rounded-2xl border border-slate-600/60 bg-white/5 backdrop-blur-md shadow-lg hover:shadow-slate-500/20 hover:border-slate-400 transition-all duration-300 hover:scale-102 p-8">
                    <h1 className="text-2xl font-bold text-slate-100">
                        Silver Membership
                    </h1>
                    <p className="mt-5 text-2xl font-bold mb-4">
                        ₹399
                        {/* <span className="text-lg text-gray-400"> / month</span> */}
                    </p>

                    <ul className="mt-5 space-y-3 text-slate-300">
                        <li className="flex items-center">
                            ✔ Get Crown
                            <div className="h-8 w-8">
                                <Lottie animationData={TwinkleCrown} />
                            </div>
                        </li>
                        <li>✓ 100 Connection Requests / day</li>
                        <li>✓ Blue Tick</li>
                        <li>✓ 3 Months Access</li>
                    </ul>

                    <button
                        className="mt-8 w-full rounded-lg bg-slate-200 text-slate-900 font-semibold py-3 hover:bg-white transition-all duration-200 shadow-md hover:shadow-slate-200/40"
                        onClick={() => handleBuyClick("silver")}
                    >
                        {membershipType === "silver"
                            ? "Already Silver"
                            : "Choose Silver"}
                    </button>
                </div>

                {/* Gold Card */}
                <div className="flex-1 rounded-2xl border border-yellow-500/50 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 backdrop-blur-md shadow-lg hover:shadow-yellow-500/20 hover:border-yellow-400 transition-all duration-300 hover:scale-102 p-8">
                    <h1 className="text-2xl font-bold text-yellow-300">
                        Gold Membership
                    </h1>
                    <p className="mt-5 text-2xl font-bold mb-4">
                        ₹499
                        {/* <span className="text-lg text-gray-400"> / month</span> */}
                    </p>

                    <ul className="mt-5 space-y-3 text-slate-200">
                        <li className="flex items-center">
                            ✔ Get Crown
                            <div className="h-8 w-8">
                                <Lottie animationData={TwinkleCrown} />
                            </div>
                        </li>
                        <li>✓ Unlimited Connection Requests</li>
                        <li>✓ Blue Tick</li>
                        <li>✓ 6 Months Access</li>
                    </ul>

                    <button
                        className="mt-8 w-full rounded-lg bg-gradient-to-r bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 transition-all duration-200 shadow-md hover:shadow-yellow-500/40"
                        onClick={() => handleBuyClick("gold")}
                    >
                        {membershipType === "silver"
                            ? "Upgrade to Gold"
                            : "Choose Gold"}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Premium

