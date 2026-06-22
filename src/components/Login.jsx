import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [emailId, setEmailId] = useState("mitul123@gmail.com");
    const [password, setPassword] = useState("Mitul@123");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + "/login",
                { emailId, password },
                { withCredentials: true },
            );
            dispatch(addUser(res.data));
            return navigate("/feed");
        } catch (err) {
            setError(err?.response?.data || "Something went wrong!");
        }
    }

    const handleSignUp = async () => {
        try {
            const res = await axios.post(BASE_URL + "/signup",
                { firstName, lastName, emailId, password },
                { withCredentials: true },
            );

            dispatch(addUser(res.data.data));
            return navigate("/profile");
        } catch (err) {
            setError(err?.response?.data);
        }
    }

    return (
        <div className="flex justify-center my-10">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 p-4">
                {/* Left side - Branding */}
                <div className="text-center lg:text-left mx-8">
                    <h1 className="text-5xl font-bold">
                        <span className="text-primary">Code</span>Nexus
                    </h1>
                    <p className="py-6 text-lg max-w-md">
                        Where developers meet, collaborate, and build amazing things together.
                        Find your perfect coding partner today!
                    </p>

                    {/* Feature highlights */}
                    <div className=" flex space-y-2">
                        <div className="badge badge-outline gap-2 p-3 m-1">
                            Match with skilled developers
                        </div>
                        <div className="badge badge-outline gap-2 p-3 m-1">
                            Collaborate on projects
                        </div>
                        <div className="badge badge-outline gap-2 p-3 m-1">
                            Real-time chat
                        </div>
                    </div>
                </div>



                <div className="card card-border bg-base-300 w-auto rounded-xl">
                    <div className="card-body">
                        <h2 className="card-title mx-auto text-2xl">
                            {isLoginForm ? "Login" : "Sign Up"}
                        </h2>
                        {!isLoginForm && (
                            <>
                                <div className="flex gap-2 ">
                                    <fieldset className="fieldset">
                                        <label className="flex gap-0 justify-start fieldset-legend">
                                            First Name<div className="text-red-500">*</div>
                                        </label>
                                        <input
                                            type="text"
                                            className="input w-full"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            placeholder="Type here"
                                            required
                                        />
                                    </fieldset>
                                    <fieldset className="fieldset">
                                        <label className="flex fieldset-legend justify-start gap-0 ">
                                            Last Name<div className="text-red-500">*</div>
                                        </label>
                                        <input
                                            type="text"
                                            className="input w-full"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            placeholder="Type here"
                                            required
                                        />
                                    </fieldset>
                                </div>
                            </>
                        )}
                        {!isLoginForm && (
                            <div className="grid grid-cols-2 gap-3 w-[385px]">
                                {/* Age */}
                                <fieldset className="fieldset">
                                    <label className="flex fieldset-legend gap-0 justify-start">
                                        Age<div className="text-red-500">*</div>
                                    </label>
                                    <input
                                        type="number"
                                        className="input w-full"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        placeholder="Age"
                                        min={16}
                                        required
                                    />
                                </fieldset>

                                {/* Gender */}
                                <fieldset className="fieldset">
                                    <label className="flex gap-0 fieldset-legend w-min">
                                        Gender<span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        className="select w-[205px"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        required>
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </fieldset>
                            </div>
                        )}


                        <div className="card bg-base-300 w-[410px] shadow-sm ">
                            <div className="card-body px-0">
                                <div>
                                    <fieldset className="fieldset">
                                        <label className="fieldset-legend flex justify-start gap-0">
                                            Email Id<span className="text-red-500">*</span>{" "}
                                        </label>
                                        <input
                                            type="text"
                                            value={emailId}
                                            onChange={(e) => setEmailId(e.target.value)}
                                            className="input w-[385px]"
                                            placeholder="Type here"
                                            required
                                        />
                                    </fieldset>
                                    <fieldset className="fieldset">
                                        <label className="fieldset-legend flex justify-start gap-0">
                                            Password<span className="text-red-500">*</span>{" "}
                                        </label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="input w-[385px]"
                                            placeholder="Type here"
                                            required
                                        />
                                    </fieldset>
                                </div>
                                <p className="text-red-500 ">{error}</p>
                                <p className="">
                                    {isLoginForm ? (
                                        <>
                                            New User?{" "}
                                            <span
                                                className="text-blue-500 cursor-pointer hover:text-blue-600 underline"
                                                onClick={() => setIsLoginForm(!isLoginForm)}>
                                                Sign Up Here
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            Already have an account?{" "}
                                            <span
                                                className="text-blue-500 cursor-pointer  hover:text-blue-600 underline"
                                                onClick={() => setIsLoginForm(!isLoginForm)}>
                                                Login Here
                                            </span>
                                        </>
                                    )}
                                </p>

                                <div className="card-actions justify-center">
                                    <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>
                                        {isLoginForm ? 'Login' : 'Sign Up'}
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );








};

export default Login;