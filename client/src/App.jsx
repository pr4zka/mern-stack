import { Route, Routes } from 'react-router-dom'
import { HomePage, NotFound, PostForm } from './pages/index'
import { PostContainer } from './context/PostContext'
import { Toaster } from 'react-hot-toast'


function App() {
  return (
    <div className='bg-gray-800 min-h-screen flex items-center'>
      <div className='px-10 container m-auto'>
        <PostContainer>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/new' element={<PostForm />} />
            <Route path='/edit/:id' element={<PostForm />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Toaster />
        </PostContainer>
      </div>
    </div>
  )
}

export default App
