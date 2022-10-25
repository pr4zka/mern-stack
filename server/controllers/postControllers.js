import PostService from "../service/postService.js";
import { uploadImage, deleteImage } from "../libs/cloudunary.js";
import Post from "../models/post.js";
import fs from "fs-extra";

class postControllers {
  static async getPost(req, res) {
    try {
      const posts = await PostService.getPost();
      return res.json(posts);
    } catch (error) {
      console.log(error);
    }
  }

  static async createPost(req, res) {
    try {
      const { title, description } = req.body;
      let image;
      if (req.files?.image) {
        const result = await uploadImage(req.files.image.tempFilePath);
        await fs.remove(req.files.image.tempFilePath);
        image = {
          url: result.url,
          public_id: result.public_id,
        };
      }
      const posts = await PostService.createPost({ title, description, image });
      return res.json(posts);
    } catch (error) {
      console.log(error);
    }
  }
  static async updatePost(req, res) {
     try {
    const { id } = req.params;
    // TODO: validate req.body before to update

    // if a new image is uploaded upload it to cloudinary
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      // add the new image to the req.body
      req.body.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
      }
    );
    return res.json(updatedPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  }
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const post = await PostService.getById(id);
      if (!post) return res.sendStatus(404);
      return res.json(post);
    } catch (error) {
      console.log(error);
    }
  }
  static async deletePost(req, res) {
    try {
      const { id } = req.params;
      const data = await PostService.deletePost(id);
      if (data && data.image.public_id) {
        await deleteImage(data.image.public_id);
      }
      if (!data) return res.sendStatus(404);
      res.sendStatus(204);
    } catch (error) {
      console.log(error);
    }
  }
}

export default postControllers;
