import { useState, createContext, useContext, useEffect } from 'react'
import { getPostRequest, createPostRequest, deletePostRequest, getPostByIdRequest, updatePostRequest } from '../api/post'

const postContext = createContext()

export const usePost = () => {
    const context = useContext(postContext)
    return context

}
export const PostContainer = ({ children }) => {

    const [posts, setPosts] = useState([])


    const getPost = async () => {
        const res = await getPostRequest()
        setPosts(res.data)
    }

    const createPost = async (post) => {
        try {
            const res = await createPostRequest(post)
            console.log(res)
            setPosts([...posts, res.data])
        } catch (error) {
           console.log(error)
        }
    }

    const deletePost = async (id) => {
        const res = await deletePostRequest(id)
        if (res.status === 204) {
            setPosts(posts.filter(post => post._id !== id))
        }
    }

    const getPostById = async (id) => {
        const res = await getPostByIdRequest(id)
        return res.data
    }

    const updatePost = async (id, post) => {
        const res = await updatePostRequest(id, post)
        console.log(res.data)
        setPosts(posts.map(post => post._id === id ? res.data : post))
    }

    useEffect(() => {
        getPost()
    }, [])

    return <postContext.Provider value={{ posts, getPost, createPost, deletePost, getPostById, updatePost }}>
        {children}
    </postContext.Provider>
}

