import postSchema from "../models/post.js";

class PostService {
  static async getPost() {
    const data = await postSchema.find();
    return data;
  }
  static async getById(id) {
    const data = await postSchema.findById(id);
    return data;
  }
  static async createPost(title, description, image) {
    const data = new postSchema(title, description, image);
    const result = await data.save()
    return result;
  }
  
  static async deletePost(id) {
    const data = await postSchema.findByIdAndDelete(id);
    return data;
  }
}

export default PostService;
