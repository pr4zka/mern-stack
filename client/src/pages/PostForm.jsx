import { Field, Form, Formik, ErrorMessage } from 'formik'
import { usePost } from '../context/PostContext'
import { useNavigate, useParams, Link } from 'react-router-dom'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'

export function PostForm() {

  const { createPost, getPostById, updatePost } = usePost()
  const navigate = useNavigate()

  const params = useParams()

  const [post, setpost] = useState({
    title: "",
    description: "",
    image: null
  })

  useEffect(() => {
    (async () => {
      if (params.id) {
        const post = await getPostById(params.id)
        setpost(post)
      }
    })()//ejecuto la funcion inmediatamente
  }, [])

  return (
    <div className='flex items-center justify-center'>
      <div className='bg-zinc-800 p-10 shadow-md shadow-black'>
        <header className='flex justify-between items-center py-4 text-white'>
          <h3 className='text-xl'>New Post</h3>
          <Link to="/" className='text-gray-400 text-sm hover:text-gray-300'>Go Back</Link>
        </header>
        <Formik initialValues={post}
          validationSchema={yup.object({
            title: yup.string().required("Title is required"),
            description: yup.string().required("Descripcion is required")
          })}
          enableReinitialize={true}

          onSubmit={async (values, actions) => {
            if (params.id) {
              await updatePost(params.id, values)
            } else {
              await createPost(values)
            }

            navigate('/')
            actions.setSubmitting(fasle)
          }}
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <label htmlFor="title" className='text-sm block font-bold text-gray-400'>Title</label>
              <Field name="title" placeholder="Title" className="px-3 py-2 focus:outline-none rounded-none bg-gray-600 text-white w-full mb-2" />
              <ErrorMessage name='title' component="p" className='text-red-400 text-sm' />
              <label htmlFor="description" className='text-sm block font-bold text-gray-400'>Description</label>
              <Field component="textarea" name="description" placeholder="Descripcion" className="px-3 py-2 focus:outline-none rounded-none bg-gray-600 text-white w-full    mb-2" row={3} />
              <ErrorMessage name='description' component="p" className='text-red-400 text-sm' />
              <input type="file" placeholder='Select a Image' className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full'
                onChange={(e) => setFieldValue('image', e.target.files[0])}
              />
              <button className='bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400' type='submit' disabled={isSubmitting}>{isSubmitting ? (
                <AiOutlineLoading3Quarters className='animate-spin h-5 w-5'/>
              ) : 'Save'}</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
