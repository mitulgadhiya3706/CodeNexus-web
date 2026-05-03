import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [emailId, setEmailId] = useState("mitul123@gmail.com");
    const [password, setPassword] = useState("Mitul@123");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post( BASE_URL + "/login", 
                { emailId, password }, 
                { withCredentials: true },
            );
            dispatch(addUser(res.data));  
            return navigate("/");  
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>
                    <div>

                        <fieldset className="fieldset">
                            <label className="fieldset-legend flex justify-start gap-0">
                                Email Id<span className="text-red-500">*</span>{" "}
                            </label>
                            <input
                                type="text"
                                value={emailId}
                                onChange={(e) => setEmailId(e.target.value)}
                                className="input w-full"
                                placeholder="Type here"
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="fieldset-legend flex justify-start gap-0">
                                Password<span className="text-red-500">*</span>{" "}
                            </label>
                            <input
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input w-full"
                                placeholder="Type here"
                            />
                        </fieldset>

                    </div>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
