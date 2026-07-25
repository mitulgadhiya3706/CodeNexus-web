import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

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
                    <h2 className="card-title">{firstName + " " + lastName}
                        {isPremium && (
                            <div className="h-8 w-9 -ml-1">
                                <p>👑</p>
                            </div>
                        )}
                    </h2>
                    {age && gender && <p>{age + ", " + gender}</p>}
                    {skills && <p>{skills}</p>}
                    <p>{about}</p>
                    <div className="card-actions justify-center my-4">
                        <button
                            className="btn btn-primary"
                            onClick={() => handleSendRequest("intersted", user._id)}
                        >Interested
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => handleSendRequest("ignore", user._id)}
                        >Ignore
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserCard;