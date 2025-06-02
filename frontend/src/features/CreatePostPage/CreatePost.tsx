import { CreatePostStyled } from "./styled";
import clsx from "clsx";

// axios request api url localhost:5001
import { instance } from "@/utils/apis/axios";

import React, { useState, useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import { Formik, Form, Field, useField } from "formik";
import { Input, Form as AntForm, Radio, Button, notification } from "antd";
import * as Yup from "yup";
import { RootState } from "@/redux/store";

import { cleanContent } from "@/utils/ToastEditor/EditorContent"; // Adjust the path as needed

// toast editor
// *** toast editor is not compatible with react version 18
import dynamic from "next/dynamic";

const ToastEditor = dynamic(() => import("@/components/Editor/ToastEditor"), {
  ssr: false,
});
//
import { ImagesFromText } from "@/utils/ToastEditor/EditorContent";
import { useRouter } from "next/router";

const CreatePostPage: React.FC = () => {
  // aquire id from the redux store
  const authentication = useSelector(
    (state: RootState) => state.authentication
  );

  const id = authentication.id;
  const router = useRouter();

  // console.log("this is redux store", id);

  interface PostValues {
    title: string;
    category: string;
    content: string;
    images: string[];
  }

  const initialValues: PostValues = {
    title: "",
    category: "",
    content: "",
    images: [],
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    category: Yup.string().required("Please select a category"),
    content: Yup.string().required("Content is required"),
  });

  // fetch categories from the backend
  type Category = {
    id: number;
    label: string;
  };

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response: any = await instance.get("/categories");

        // console.log(response);
        setCategories(response);
      } catch (error) {
        console.error("error fetching categories", error);
      }
    };

    getCategories();
  }, []);

  // editor variable declaration
  const editorRef = useRef<any>(null);

  const handleSubmit = async (values: PostValues) => {
    // 1. Separate editor text and editor images (this part remains the same)
    const { text, images } = ImagesFromText(values.content);

    // 2. Apply cleanContent to the extracted text
    const cleanedText = cleanContent(text); // Apply the cleaning here!

    try {
      const createPost = {
        title: values.title,
        // Use the cleaned text for content
        content: cleanedText,
        images: images, // The images array remains as is
        userid: id, // Assuming 'id' is available in this scope
        categoryid: parseInt(values.category, 10),
      };

      const response = await instance.post("/posts/create", createPost);
      console.log("post created", response);

      notification.success({
        message: "Post Created",
        description: "Your new post has been successfully published!",
        placement: "topRight", // Or your preferred placement
      });

      router.push("/");
    } catch (error) {
      console.error("error creating post", error);
      // You might want to add an error notification here as well
      notification.error({
        message: "Post Creation Failed",
        description:
          "There was an error publishing your post. Please try again.",
        placement: "topRight",
      });
    }
  };

  return (
    <>
      <CreatePostStyled className={clsx("create-post-container")}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, errors, touched, handleChange }) => (
            <div className="post-input-container">
              <Form>
                {/* gives off 'title' beside the input box and with the required */}
                {/* it adds the red asterisk */}
                <div className="title-container">
                  <label htmlFor="title">Title</label>
                  <Input
                    id="title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    placeholder="enter post title"
                  />
                  {errors.title && touched.title && (
                    <div style={{ color: "red" }}>{errors.title}</div>
                  )}
                </div>

                <div className="category-container">
                  <label htmlFor="category">Category</label>
                  <Radio.Group
                    name="category"
                    onChange={(e) => setFieldValue("category", e.target.value)}
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

                <div className="content-container">
                  <label htmlFor="content">Content</label>
                  <ToastEditor
                    initialValue={values.content}
                    ref={editorRef}
                    onChange={(markdown) => {
                      setFieldValue("content", markdown);
                    }}
                  />
                  {errors.content && touched.content && (
                    <div style={{ color: "red" }}>{errors.content}</div>
                  )}
                </div>

                <div className="button-container">
                  <Button htmlType="submit">Submit Post</Button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </CreatePostStyled>
    </>
  );
};

export default CreatePostPage;
