import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import LottieImport from "lottie-react";
import noDataAnimation from "../assets/No Data.json";

const Lottie = LottieImport?.default || LottieImport;

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();

    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true });
            dispatch(removeRequest(_id));
        } catch (err) {
            console.log(err.response.message);
        }
    }

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });

            dispatch(addRequests(res.data.data));
        } catch (err) {
            // console.error("Error", err.response?.data?.message || err.message);
            console.log(err.response.message);
        }
    }

    useEffect(() => {
        fetchRequests();
    });

    if (!requests) return;

    if (requests.length === 0) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-32 mx-auto">
                        <Lottie animationData={noDataAnimation} />
                    </div>
                    <p className=" text-gray-400">No Requests Found!!</p>
                </div>
            </div>
        )
    }

    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-white text-2xl">Connection Requests</h1>

            {requests.map((request) => {
                console.log("Full request object:", request);
                const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

                return (
                    <div
                        // key={_id}
                        key={request._id}
                        className=" flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
                    >
                        <div>
                            <img src={photoUrl} alt="photo" className="w-20 h-20 rounded-full" />
                        </div>
                        <div className="text-left mx-4 ">
                            <h2 className="font-bold text-xl">
                                {firstName + " " + lastName}
                            </h2>
                            {age && gender && <p>{age + ", " + gender}</p>}
                            <p>{about}</p>
                        </div>
                        <div>
                            <button className="btn btn-primary text-base rounded-box"
                                onClick={() => reviewRequest("accepted", request._id)}
                            >Accept</button>

                            <button className="btn bg-gray-700 border border-gray-700 mx-2 text-base hover:bg-gray-800 rounded-box"
                                onClick={() => reviewRequest("rejected", request._id)}
                            >Reject</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Requests;