import axios from "axios";

export const getPostRequest = async () =>
  await axios.get("http://localhost:3000/post");

export const createPostRequest = async (post) => {
  const form = new FormData();

  for (let key in post) {
    form.append(key, post[key]);
  }

  return await axios.post("http://localhost:3000/post", form, {
    headers: {
      "Content-Type": "multipart/data",
    },
  });
};

export const deletePostRequest = async (id) =>
  await axios.delete("http://localhost:3000/post/" + id);
export const getPostByIdRequest = async (id) =>
  await axios.get("http://localhost:3000/post/" + id);
export const updatePostRequest = async (id, post) =>
  await axios.put(`http://localhost:3000/post/${id}`, post);
