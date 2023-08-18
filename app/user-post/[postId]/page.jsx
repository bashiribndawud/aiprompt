"use client"

import React, {useEffect} from 'react'
import { useParams } from "next/navigation";
const UserPostPage = () => {
 const params = useParams();
 console.log(params)
    const getAllUserPost = async () => {
        const response = await fetch(``)
    }
    useEffect(() => {

    }, [params.postId])
  return (
    <div>page</div>
  )
}

export default UserPostPage;