import Link from "next/link";
import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { db } from "../firebase";
import { useRouter } from "next/router";

const blogid = ({ blog, user, comments }) => {
  const router = useRouter();
  const { blogid } = router.query;
  const [commentText, setCommentText] = useState("")
  const [allComments, setAllComments] = useState(comments)


  const handleComment = async() => {
      if(!commentText) {
          return null
      }
    db.collection("blogs").doc(blogid).collection("comments").add({
      comment: commentText,
      name: user.displayName,
    });
    
    
    const queryComments = await db.collection("blogs").doc(blogid).collection("comments").orderBy("comment","desc").get();
    
    setAllComments(queryComments.docs.map(doc => doc.data()))
    
    setCommentText("")
      
   
  };



  return (
    <>
      <Navbar />
      <div className="mt-5 container">
        <div className="text-center">
          <h1 className="text-weight-bold">{blog.title}</h1>
          <h3>Created Date: {new Date(blog.createdAt).toDateString()}</h3>
        </div>
        <div className="card me-auto ms-auto shadow" style={{ width: "50rem" }}>
          <img src={blog.imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h1 className="card-title font-weight-bold">{blog.title}</h1>
            <p className="card-text">{blog.body}.</p>
            <Link href={`/`} className="">
              <button className="btn btn-primary">Back</button>
            </Link>
          </div>

          <div className="mt-3 ms-3">
            <h2 className="text-success">Comments </h2>
            <div className="col-6 row my-3 ms-2">
              <div className="col-8">
                <input
                  type="text"
                  aria-label="Last name"
                  className="form-control"
                  placeholder="Write comment"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
              </div>
              <div className="col-4">
                <button className="btn btn-primary" onClick={handleComment}>
                  Add
                </button>
              </div>
            </div>
            <div className="ms-5">
              {allComments.map((comment) => (
                <div key={comment.comment} key={comment.comment}>
                  <p className="text-secondary shadow border p-3 d-inline-flex">
                    {comment.comment}{" "}
                    <span className="mt-3 ms-2">{`"${comment.name}"`}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default blogid;

export async function getServerSideProps({ params: { blogid } }) {
  console.log(blogid);

  const res = await db.collection("blogs").doc(blogid).get();
  console.log("data", res.data());

  const blog = {
    ...res.data(),
    createdAt: res.data().createdAt.toMillis(),
  };

  const commentResult = await db
    .collection("blogs")
    .doc(blogid)
    .collection("comments")
    .get();

  const comments = commentResult.docs.map((doc) => doc.data());

  console.log(comments);

  return {
    props: { blog, comments },
  };
}
