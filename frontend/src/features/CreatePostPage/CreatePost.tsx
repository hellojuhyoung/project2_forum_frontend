import { CreatePostStyled } from "./styled";
import clsx from "clsx";

// axios request api url localhost:5001
import { instance } from "@/utils/apis/axios";

import React, { useState, useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import { Formik, Form, Field, useField } from "formik";
import { Input, Form as AntForm, Radio, Button } from "antd";
import * as Yup from "yup";
import { RootState } from "@/redux/store";

// toast editor
// *** toast editor is not compatible with react version 18
import dynamic from "next/dynamic";

const ToastEditor = dynamic(() => import("@/components/Editor/ToastEditor"), {
  ssr: false,
});
//
import { ImagesFromText } from "@/utils/ToastEditor/EditorContent";

const CreatePostPage: React.FC = () => {
  // aquire id from the redux store
  const authentication = useSelector(
    (state: RootState) => state.authentication
  );

  const id = authentication.id;

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
    // separating editor text and editor images
    const { text, images } = ImagesFromText(values.content);

    try {
      const createPost = {
        title: values.title,
        content: text,
        images: images,
        userid: id,
        categoryid: parseInt(values.category, 10),
      };

      const response = await instance.post("/posts/create", createPost);
      console.log("post created", response);
    } catch (error) {
      console.error("error creating post", error);
    }
  };

  // const handleSubmit = async (values: typeof initialValues) => {
  //   console.log("form values on submit", values);

  //   const { text, images } = ImagesFromText(values.content);

  //   console.log("text from editor", text);
  //   console.log("images from editor", images);
  // };

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
