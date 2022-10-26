import { usePost } from '../context/PostContext'
import { VscEmptyWindow } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import { PostCard } from '../components/PostCard'

export function HomePage() {
    const { posts } = usePost()

    const renderMain = () => {
        if (posts.length === 0) return (
            <div className='flex flex-col justify-center items-center text-white text-xl'>
                <VscEmptyWindow className='w-20 h-20 text-white' />
                <h1>Here are no posts</h1>
            </div>
        )
        return (
            <div className='grid grid-cols-3 gap-2'>
                {posts.map(post => (
                    <PostCard post={post} key={post._id} />
                ))}
            </div>
        )
    }
    return (
        <div className='text-white'>
            <header className='flex justify-between py-4'>
                <h1 className='text-2xl text-gray-300 font-bold'>Post: {posts.length}</h1>
                <Link to={'/new'} className="text-white text-2xl px-3 py-2 bg-indigo-500 hover:bg-indigo-600">Add Post</Link>
            </header>
            {renderMain()}
        </div>
    )
}