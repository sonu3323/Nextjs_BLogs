import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { auth } from "../pages/firebase";

const Navbar = ({user}) => {

  const router = useRouter ();

  console.log("user", router)

  const handleSignout =()=>{
    auth.signOut()
    router.push("/login")
    }

  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" href="/">
            Blog
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item text-dark me-3">
                <Link className="nav-link" aria-current="page" href="/createblog">
              Create blog
                </Link>
              </li>
              <li className="nav-item">
                  {user || router.query.user ? ( 
                  <Link className="nav-link text-danger" href="#" >
                    <button  onClick={handleSignout} className="btn btn-danger">
                  logout

                    </button>
                </Link>): (
                    <Link className="nav-link" href="/login">
                    sign in
                  </Link>
                ) }
               
              </li>
              
         
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
