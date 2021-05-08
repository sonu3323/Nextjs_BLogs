import Link from "next/link";
import React from "react";
import blog from "./blog";

const Blogs = ({allBlogs , newBlog , endBlogs}) => {

  console.log(allBlogs)


   const blogBody = allBlogs.map(blog => (
    <div key={blog.id} className="card mt-5 ms-3 shadow" style={{"width": "20rem"}}>
    <img src={blog.imageUrl} className="card-img-top" alt="..." />
    <div className="card-body">
      <h4 className="card-title font-weight-bold">{blog.title}</h4>
      <p className="card-text blog-body">{blog.body}.</p>
      <Link href={`blogs/${blog.id}`} className="">
          <button className="btn btn-primary">
              Read More
          </button>
      </Link>
    </div>
  </div>
   )) 


  return (
    <>
 <div className="container mt-5 ms-auto me-auto">
        <div className="row ms-5">
       {blogBody}
        </div>
      </div>
      <div className="text-center mt-5">
          {endBlogs ? (
              <h2>{endBlogs}</h2>
          ): (
               <button className="btn btn-primary "
               onClick={()=>newBlog()}
               >
                   Load More
               </button>
          )}
       

      </div>
    </>
  );
};

export default Blogs;


