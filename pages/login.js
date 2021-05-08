import React, { useState } from "react";
import Link from "next/link";
import { auth } from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const Login = () => {
  const router =  useRouter()
  const [loginDetails, setLoginDetails] = useState({
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

  const handleSignin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(loginDetails.email, loginDetails.password)
      .then((res) => {
        console.log(res);
        toast(`Welcome ${res.user.displayName}`);
        router.push("/")
      })
      .catch((err) => {
        setLoginDetails({ ...loginDetails, error: err.message });
        toast(err.code);
        console.log(err)
      });
  };

  return (
    <>
    <ToastContainer />
      <div className="container">
        <div className="row no-gutter">
          <div className="col-md-6 d-none d-md-flex bg-image"></div>

          <div className="col-md-6 bg-light">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-xl-7 mx-auto">
                    <h2 className="">Welcome Back!</h2>
                    <p className="text-muted mb-4">Your blog place</p>
                    <form>
                      <div className="form-group mb-3">
                        <input
                          id=""
                          type="email"
                          placeholder="Email address"
                          required=""
                          name="email"
                          autofocus=""
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

                      <button
                        className="btn btn-primary btn-block text-uppercase mb-2  shadow-sm"
                        onClick={handleSignin}
                      >
                        Login in
                      </button>
                      <Link href="/signup">
                        <button className="btn btn-primary btn-block text-uppercase mb-2  shadow-sm ms-3">
                          Sign up
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
  );
};

export default Login;
