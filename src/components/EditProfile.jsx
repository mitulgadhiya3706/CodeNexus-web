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
    const [skills, setSkills] = useState(user.skills || []);
    const [gitHubUrl, setGithubUrl] = useState(user.gitHubUrl);
    const [linkedInUrl, setLinkedInUrl] = useState(user.linkedInUrl);

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
                skills,
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
            <div className="flex justify-center gap-10 items-center ">
                <div className=" w-[616px] flex justify-center items-start pt-3  text-blue-200">
                    <div className="card w-full max-w-lg bg-base-300  rounded-xl shadow-2xl shadow-slate-800/80">
                        <div className="card-body space-y-0">
                            <h2 className="card-title justify-center">Edit Profile</h2>

                            <div className="flex justify-center">
                                <div className="avatar">
                                    <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={photoUrl} alt="Profile" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
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
                                    <label className="fieldset-legend">GitHub</label>
                                    <input
                                        type="text"
                                        className="input input-sm input-bordered w-full"
                                        value={gitHubUrl}
                                        onChange={(e) => setGithubUrl(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <label className="fieldset-legend">LinkedIn</label>
                                    <input
                                        type="text"
                                        className="input input-sm input-bordered w-full"
                                        value={linkedInUrl}
                                        onChange={(e) => setLinkedInUrl(e.target.value)}
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
                            </div>

                            <div>
                                <fieldset className="fieldset ">
                                    <label className="fieldset-legend">About:</label>
                                    <textarea className="textarea w-full" value={about} onChange={(e) => setAbout(e.target.value)} placeholder="Express yourself.."></textarea>
                                </fieldset>
                            </div>

                            {/* Skills */}
                            <fieldset className="fieldset">
                                <label className="fieldset-legend">Skills : </label>
                                <input
                                    className="input input-sm input-bordered w-full"
                                    value={skills}
                                    onChange={(e) => setSkills(e.target.value.split(","))}
                                />
                            </fieldset>


                            <div className="card-actions justify-center">
                                <button className="btn btn-primary" onClick={saveProfile}>
                                    Save Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <UserCard user={{ firstName, lastName, photoUrl, age, gender,skills, about }} />
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