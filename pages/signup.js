import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState } from "react";
import { auth } from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.css";

const signup = () => {
  const router = useRouter();
  const [newUser, setNewUser] = useState(false)


  const [loginDetails, setLoginDetails] = useState({
    username: "",
    email: "",
    password: "",
    error: "",
  });

  const handleSubmit = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(loginDetails.email, loginDetails.password)
      .then((res) => {
        console.log(res);
        res?.user?.updateProfile({
          displayName: loginDetails.username,
        });

        toast(`Welcome ${loginDetails.username}`);

        

        router.push({pathname: "/" , 
        query: {  user:true }
       })
      })
      .catch((err) => {
        setLoginDetails({ ...loginDetails, error: err.message });
        toast(err.message);
      });
  };

  console.log(loginDetails);

  return (
    <>
      <>
        <ToastContainer />
        <div className="container">
          <div className="row no-gutter">
            <div
              className={`col-md-6 d-none d-md-flex ${
                router.pathname === "/signup" && "signup-bg-image "
              }`}
            ></div>

            <div className="col-md-6 bg-light">
              <div className="login d-flex align-items-center py-5">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-10 col-xl-7 mx-auto">
                      <h1 className="">Welcome !</h1>
                      <p className="text-muted mb-4">Your blog place</p>
                      <form>
                        <div className="form-group mb-3">
                          <input
                            id=""
                            type="email"
                            placeholder="Username"
                            name="username"
                            className="form-control rounded-pill border-0 shadow-sm px-4"
                            onChange={handleSubmit}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <input
                            id=""
                            type="email"
                            placeholder="Email address"
                            name="email"
                            className="form-control rounded-pill border-0 shadow-sm px-4"
                            onChange={handleSubmit}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <input
                            id="inputPassword"
                            type="password"
                            placeholder="Password"
                            required=""
                            name="password"
                            className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                            onChange={handleSubmit}
                          />
                        </div>
                        {loginDetails?.error && (
                          <p className="text-danger">{loginDetails.error}</p>
                        )}

                        <button
                          className="btn btn-primary btn-block text-uppercase mb-2  shadow-sm"
                          onClick={handleSignup}
                        >
                          Sign in
                        </button>

                        <Link href="/login">
                          <button className="btn btn-primary btn-block text-uppercase mb-2  shadow-sm ms-3">
                            Loign
                          </button>
                        </Link>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default signup;
