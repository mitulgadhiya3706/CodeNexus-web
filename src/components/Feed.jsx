import axios from "axios";
import { BASE_URL } from "../utils/constants";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import LottieImport from "lottie-react";
import noDataAnimation from "../assets/No Data.json";
import loadingAnimation from "../assets/loading.json"

const Lottie = LottieImport?.default || LottieImport;

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();

    const getFeed = async () => {
        if (feed) return;
        try {
            const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
            dispatch(addFeed(res?.data?.data));
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        getFeed();
    }, []);

    if (!feed) {
    return (
      <div className="flex h-screen justify-center my-auto">
        {" "}
        {/* <Lottie animationData={loading} /> */}
        <span className="loading loading-dots loading-lg "></span>
      </div>
    );
  }

    if (!Array.isArray(feed) || feed.length === 0) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-32 mx-auto">
                        <Lottie animationData={noDataAnimation} />
                    </div>
                    <p className=" text-gray-400">No new user found!!</p>
                </div>
            </div>
        );
    }

    return (
        feed && (
            <div className="flex justify-center my-10">
                <UserCard user={feed[0]} />
            </div>
        )
    )
}

export default Feed;