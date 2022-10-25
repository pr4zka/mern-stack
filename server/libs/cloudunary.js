import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv'
import {API_KEY, API_SECRET} from '../config.js'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})

export const uploadImage = async filePath => {
 return await cloudinary.uploader.upload(filePath, {
    folder: 'test',
   })
}
export const deleteImage = async public_id => {
    return await cloudinary.uploader.destroy(public_id)
}