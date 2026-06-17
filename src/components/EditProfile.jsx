import { useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);

    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);

    const saveProfile = async () => {
        setError("");       //Cleans errors
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                about,
            },
                { withCredentials: true }
            );
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        } catch (err) {
            // setError(err.response.data);
            setError(err?.response?.data?.message);
        }
    }

    return (
        <>
            <div className="flex justify-center my-10">
                <div className="flex justify-center mx-10">
                    <div className="card bg-base-300 w-96 shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title justify-center">Edit Profile</h2>
                            <div>
                                <fieldset className="fieldset">
                                    <label className="fieldset-legend flex justify-start gap-0">
                                        First Name:
                                    </label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="input w-full"
                                        placeholder="Type here"
                                    />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <label className="fieldset-legend flex justify-start gap-0">
                                        Last Name:
                                    </label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="input w-full"
                                        placeholder="Type here"
                                    />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <label className="fieldset-legend flex justify-start gap-0">
                                        Photo Url:
                                    </label>
                                    <input
                                        type="text"
                                        value={photoUrl}
                                        onChange={(e) => setPhotoUrl(e.target.value)}
                                        className="input w-full"
                                        placeholder="Type here"
                                    />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <label className="fieldset-legend flex justify-start gap-0">
                                        Age:
                                    </label>
                                    <input
                                        type="text"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        className="input w-full"
                                        placeholder="Type here"
                                    />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <label className="fieldset-legend">Gender:</label>
                                    <select value={gender} onChange={(e) => setGender(e.target.value)} className="select">
                                        <option disabled value="">Select gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </fieldset>
                                <fieldset className="fieldset">
                                    <label className="fieldset-legend">About:</label>
                                    <textarea className="textarea" value={about} onChange={(e) => setAbout(e.target.value)} placeholder="Express yourself.."></textarea>
                                </fieldset>
                            </div>
                            <div className="card-actions justify-center">
                                <button className="btn btn-primary" onClick={saveProfile}>
                                    Save Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
            </div>

            {showToast && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile saved successfully.</span>
                    </div>
                </div>
            )}     
        </>
    )
}

export default EditProfile;














{/* <label className="fieldset-legend flex justify-start gap-0">
                                    Gender:
                                </label> */}

{/* <input
                                    type="text"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="input w-full"
                                    placeholder="Type here"
                                /> */}