import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import LottieImport from "lottie-react";
import TwinkleCrown from "../assets/TWINKLE CROWN!.json";

const Lottie = LottieImport?.default || LottieImport;


const UserCard = ({ user }) => {
    if (!user) return null;

    const { firstName, lastName, age, about, gender, photoUrl, skills, gitHubUrl, linkedInUrl, isPremium } = user;
    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
        try {
            const res = axios.post(BASE_URL + "/request/send/" + status + "/" + userId,
                {},
                { withCredentials: true }
            );
            console.log(userId);
            dispatch(removeUserFromFeed(userId));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className="card bg-base-300 w-96 shadow-sm">
                <figure>
                    <img
                        src={photoUrl} alt="user-photo" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title font-bold text-white text-2xl drop-shadow-lg">
                        {firstName + " " + lastName}
                        {isPremium && (
                            <div className="h-8 w-8">
                                <Lottie animationData={TwinkleCrown} />
                            </div>
                        )}
                    </h2>

                    {/* Age + Gender */}
                    {age && gender && (
                        <p className="flex gap-4 text-gray-100 font-semibold drop-shadow-md">
                            <span>
                                <span className="font-bold text-white">Age:</span> {age}{" "}
                                Yr.,
                            </span>
                            <span>
                                <span className="font-bold text-white">Gender:</span>{" "}
                                {gender}
                            </span>
                        </p>
                    )}

                    {/* Skills */}
                    {skills && (
                        <div className="mt-1">
                            <p className="font-bold text-white">Skills:</p>
                            <div className="flex flex-wrap gap-2 mt-2 mb-1">
                                {skills.map((skill, idx) => (
                                    <div key={idx} className="badge badge-outline">
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* About */}
                    <p> <span className="font-bold text-white">About: </span> {about} </p>

                    {/* Buttons */}
                    <div className="card-actions justify-center my-4">
                        <button
                            // className="px-6 py-3 text-xl font-medium rounded-md border border-blue-500 bg-blue-50 text-blue-600  hover:bg-indigo-400/30 hover:text-white hover:scale-102 transition-colors duration-200"
                            className="px-6 py-2 text-xl font-medium rounded-md border bg-indigo-400/30 text-white border-blue-400/40 bg-blue-50 hover:bg-indigo-500 hover:text-white hover:scale-102 transition-colors duration-200"
                            onClick={() => handleSendRequest("interested", user._id)}
                        >Interested
                        </button>

                        <button
                            // className="px-6 py-3 text-xl font-medium rounded-md border border-red-500 bg-red-100 text-red-600 hover:bg-red-500 hover:text-white hover:scale-102 hover:border-red-300 transition-colors duration-200"
                            className="px-6 py-2 text-xl font-medium rounded-md border bg-red-400/30 text-white border-red-400/40 bg-blue-50 hover:bg-red-400 hover:text-white hover:scale-102 transition-colors duration-200"
                            onClick={() => handleSendRequest("ignored", user._id)}
                        >Ignore
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserCard;