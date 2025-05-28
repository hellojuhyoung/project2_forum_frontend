import { CreatePostStyled } from "../CreatePostPage/styled";
import clsx from "clsx";

import { instance } from "@/utils/apis/axios";

import React, { useState, useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { Input, Radio, Button } from "antd";
import * as Yup from "yup";
import { RootState } from "@/redux/store";

import dynamic from "next/dynamic";

const ToastEditor = dynamic(() => import("@/components/Editor/ToastEditor"), {
  ssr: false,
});

import {
  ImagesFromText,
  convertImageUrlsToBase64,
  cleanContent,
} from "@/utils/ToastEditor/EditorContent";
import { useRouter } from "next/router";

const EditPostPage: React.FC = () => {
  const router = useRouter();
  const { postid } = router.query;

  const authentication = useSelector(
    (state: RootState) => state.authentication
  );
  const id = authentication.id;

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  type PostValues = {
    title: string;
    category: string;
    content: string; // markdown content (text + image markdown)
    images: string[]; // image paths extracted from content
  };

  const [initialValues, setInitialValues] = useState<PostValues>({
    title: "",
    category: "",
    content: "",
    images: [],
  });

  const [categories, setCategories] = useState<{ id: number; label: string }[]>(
    []
  );

  const editorRef = useRef<any>(null);

  useEffect(() => {
    // Fetch categories once
    const getCategories = async () => {
      try {
        const response: any = await instance.get("/categories");
        setCategories(response);
      } catch (error) {
        console.error("error fetching categories", error);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    if (!router.isReady || !postid || !API_URL) return;

    const fetchPost = async () => {
      try {
        const response: any = await instance.get(`/posts/${postid}`);
        const post = response.post;

        if (post) {
          const editorContent = await convertImageUrlsToBase64(
            post.content || "",
            post.images?.map((img: any) => img.postImage) || [],
            API_URL
          );

          setInitialValues({
            title: post.title || "",
            category: post.categoryid ? post.categoryid.toString() : "",
            content: editorContent,
            images: post.images?.map((img: any) => img.postImage) || [],
          });
        }
      } catch (error) {
        console.error("error fetching post for edit", error);
      }
    };

    fetchPost();
  }, [router.isReady, postid, API_URL]);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    category: Yup.string().required("Please select a category"),
    content: Yup.string().required("Content is required"),
  });

  const handleUpdate = async (values: PostValues) => {
    // Parse content markdown to separate text and images
    const { text, images } = ImagesFromText(values.content);
    const cleanedContent = cleanContent(text);

    try {
      const updatePost = {
        title: values.title,
        content: cleanedContent, // text without image markdown
        images: images, // array of image paths like '/uploads/abc.jpg'
        userid: id,
        categoryid: parseInt(values.category, 10),
      };
      console.log("Images to update:", updatePost.images);

      console.log("handleupdate", updatePost);
      console.log("Submitting post with values:", values);

      const response = await instance.put(
        `/posts/update/${postid}`,
        updatePost
      );

      console.log("post updated", response);
      router.push(`/posts/detail?postid=${postid}`);
    } catch (error) {
      console.error("error updating post", error);
    }
  };

  return (
    <>
      {initialValues && (
        <CreatePostStyled className={clsx("edit-post-container")}>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleUpdate}
          >
            {({ values, setFieldValue, errors, touched, handleChange }) => (
              <div className="post-input-container">
                <Form>
                  {/* title input */}
                  <div className="title-container">
                    <label htmlFor="title">Title</label>
                    <Input
                      id="title"
                      name="title"
                      value={values.title}
                      // onChange={handleChange}
                      onChange={(e) => setFieldValue("title", e.target.value)}
                      placeholder="Enter post title"
                    />
                    {errors.title && touched.title && (
                      <div style={{ color: "red" }}>{errors.title}</div>
                    )}
                  </div>

                  {/* category radio */}
                  <div className="category-container">
                    <label htmlFor="category">Category</label>
                    <Radio.Group
                      name="category"
                      onChange={(e) =>
                        setFieldValue("category", e.target.value)
                      }
                      value={values.category}
                    >
                      {categories.map((cat) => (
                        <Radio key={cat.id} value={cat.id.toString()}>
                          {cat.label}
                        </Radio>
                      ))}
                    </Radio.Group>
                    {errors.category && touched.category && (
                      <div style={{ color: "red" }}>{errors.category}</div>
                    )}
                  </div>

                  {/* content editor */}
                  <div className="content-container">
                    <label htmlFor="content">Content</label>
                    <ToastEditor
                      key={initialValues.content}
                      ref={editorRef}
                      initialValue={initialValues.content}
                      onChange={(markdown) =>
                        setFieldValue("content", markdown)
                      }
                    />
                    {errors.content && touched.content && (
                      <div style={{ color: "red" }}>{errors.content}</div>
                    )}
                  </div>

                  {/* submit button */}
                  <div className="button-container">
                    <Button htmlType="submit">Update Post</Button>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </CreatePostStyled>
      )}
    </>
  );
};

export default EditPostPage;
