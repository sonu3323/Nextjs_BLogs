import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import styles from '../styles/Home.module.css'
import Blogs from './Blogs'
import { db } from './firebase'

export default function Home({user , allBlogs}) {

  const [blogs, setBlogs] = useState(allBlogs);
  const [endBlogs, setEndBlogs] = useState("")

  const loadMoreBlogs = async() =>{

    console.log("button clicked")

   const lastBlog = blogs[blogs.length - 1];

   console.log(lastBlog)

    const result = await db.collection("blogs").orderBy("createdAt","desc").startAfter(new Date(lastBlog.createdAt))
      .limit(3).get()

    const newBlog = result.docs.map(doc => {
      return {
        ...doc.data() ,
        createdAt:doc.data().createdAt.toMillis(),
        id: doc.id 
      }
      })

    
    setBlogs([...blogs , ...newBlog])
   newBlog.length =="0" ? setEndBlogs("Ends Blogs Here ***"):null
    
  }

  return (
    <>
     <Navbar user={user} />
     <Blogs allBlogs={blogs} newBlog={loadMoreBlogs} endBlogs={endBlogs} />
    </>
  )
}




export async function getServerSideProps(context) {
 
  const snapshot = await db.collection('blogs').limit(3).orderBy("createdAt" , "desc").get()
  const allBlogs = snapshot.docs.map(doc => {
    return {
      ...doc.data() ,
      createdAt:doc.data().createdAt.toMillis(),
      id: doc.id 
    }
  });

  console.log(allBlogs)

  return {
    props: {allBlogs}, // will be passed to the page component as props
  }
}