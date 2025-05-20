// axios request api url localhost:5001
import { instance } from "@/utils/apis/axios";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const EditPostPage = () => {
  const router = useRouter();
  const { postid } = router.query;

  const [data, setData] = useState<{
    id?: number;
    title?: string;
    content?: string;
    thumbnail?: string;
    contentImage?: string;
    userid?: number;
    categoryid?: number;
  } | null>(null);

  useEffect(() => {
    if (!router.isReady) return;

    const editPost = async () => {
      try {
        const response: any = await instance.get(`/posts/${postid}`);
        const post = response.post;

        setData(post);
      } catch (error) {
        console.error("error in getting a post in edit post", error);
      }
    };

    editPost();
  }, [router.isReady, postid]);

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const response: any = await instance.put(`/posts/update/${postid}`, {
        data,
      });

      console.log(response);
      console.log(response.result, response.message);
    } catch (error) {
      console.error("error updating the post", error);
    }
    console.log("handle save", data);
  };

  const handleDelete = async () => {
    try {
      const response = await instance.delete(`/posts/${postid}`);

      console.log(response);
    } catch (error) {
      console.error("error in deleting the post", error);
    }
  };

  return (
    <>
      <div>button clicked</div>
      <div className="edit-container">
        <input
          type="text"
          className="title"
          name="title"
          value={data?.title || ""}
          onChange={handleChange}
        />
        <input
          type="text"
          className="content"
          name="content"
          value={data?.content || ""}
          onChange={handleChange}
        />
        <input
          type="text"
          className="thumbnail"
          name="thumbnail"
          value={data?.thumbnail || ""}
          onChange={handleChange}
        />
        <input
          type="text"
          className="contentImage"
          name="contentImage"
          value={data?.contentImage || ""}
          onChange={handleChange}
        />
      </div>
      <div className="submit-button-container">
        <button onClick={handleSave}>save</button>
        <button onClick={handleDelete}>delete</button>
      </div>
    </>
  );
};

export default EditPostPage;
