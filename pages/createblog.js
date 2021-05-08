import React, { useState , useEffect } from "react";
import Navbar from "../Components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import { db, storage } from "./firebase";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase";

const createblog = ({ user }) => {
  const [blogDetails, setBlogDetails] = useState({
    title: "",
    body: "",
    file: "",
    url: "",
  });

  useEffect(() => {
    if (blogDetails.url) {
      try {
      db.collection("blogs").add({
          title: blogDetails.title,
          body: blogDetails.body,
          imageUrl: blogDetails.url,
          postedBy:user.uid ,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
 
        });
        toast("Blog save successfully");
        setBlogDetails({
          title:"",
          body: "",
          url: "",
          file:""
        })
      } catch (error) {
        toast("error while saving in database");
      }
    }
   
  }, [blogDetails.url]);

  const handleChange = (e) => {
    setBlogDetails({
      ...blogDetails,
      [e.target.name]:
        e.target.name === "file" ? e.target.files[0] : e.target.value,
    });
  };

  console.log(blogDetails);

  const handleSubmit = (e) => {
    console.log(blogDetails);
    if (!blogDetails.title || !blogDetails.body || !blogDetails.file) {
      toast("Please upload all fields!");
    }

    const uploadTask = storage
      .ref()
      .child(`images/${uuidv4()}`)
      .put(blogDetails.file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        if (progress == "100") {
          toast("File uploaded successfully");
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          setBlogDetails({
            ...blogDetails,
            url: downloadURL,
          });
         
        });
      }
    );

    console.log(blogDetails);

   
  };

  return (
    <>
      <Navbar user={user} />
      <ToastContainer />
      <div className="container mt-5 text-center">
        <div className="container">
          <div className="container border p-3">
            <h1 className="text-primary">Create a new blog </h1>
            <div className="col-md-8 ms-auto me-auto">
              <div className="mb-3 text-start">
                <label for="exampleFormControlInput1" className="form-label ">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Title"
                  name="title"
                  value={blogDetails.title}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 text-start">
                <label for="exampleFormControlTextarea1" className="form-label">
                  Blog
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Type your blog.."
                  name="body"
                  value={blogDetails.body}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="mb-3 text-start">
                <label for="formFile" className="form-label">
                  choose file
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  name="file"
                 
                  onChange={handleChange}
                />
              </div>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default createblog;
