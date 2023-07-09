import axios from "axios";
import { ACTIONS } from "../reducers/DataRedcuer";

const { SET_ALLPOSTS } = ACTIONS;

export const uploadImageHandle = async (image) => {
  console.log("upload started");
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "tjjrat4c");
  data.append("cloud_name", "ddqytua2y");

  fetch("https://api.cloudinary.com/v1_1/ddqytua2y/image/upload", {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

export const createPost = async (authToken, post, userData, dispatchData) => {
  try {
    const response = await axios.post(
      "/api/posts",
      {
        postData: {
          content: post.content,
          mediaURL: post.postImage,
          name: `${userData.firstName} ${userData.lastName}`,
        },
      },
      { headers: { authorization: authToken } }
    );
    // console.log({ response });
    if (response.status === 201) {
      dispatchData({ type: SET_ALLPOSTS, payload: response.data.posts });
    }
  } catch (error) {
    console.error(error);
  }
};

export const editPost = async (authToken, postdata, dispatchData) => {
  try {
    const response = await axios.post(
      `/api/posts/edit/${postdata._id}`,
      { postData: postdata },
      {
        headers: { authorization: authToken },
      }
    );
    // console.log(response);
    if (response.status === 201) {
      dispatchData({ type: SET_ALLPOSTS, payload: response.data.posts });
    }
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async (authToken, postId, dispatchData) => {
  try {
    const response = await axios.delete(`/api/posts/${postId}`, {
      headers: { authorization: authToken },
    });
    // console.log({response});
    if (response.status === 201) {
      dispatchData({ type: SET_ALLPOSTS, payload: response.data.posts });
    }
  } catch (error) {
    console.error(error);
  }
};
