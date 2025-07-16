import { CreatePostStyled } from "../CreatePostPage/styled";
import clsx from "clsx";

import { instance } from "@/utils/apis/axios";

import React, { useState, useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { Input, Radio, Button, notification } from "antd";
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
import { useTranslation } from "react-i18next";

const EditPostPage: React.FC = () => {
  const { t } = useTranslation("editpost");
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
    title: Yup.string().required(t("validation_title_required")),
    category: Yup.string().required(t("validation_category_required")),
    content: Yup.string().required(t("validation_content_required")),
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

      notification.success({
        message: t("notification_success_title"),
        description: t("notification_post_updated_description"),
        placement: "topRight",
      });
      router.push(`/posts/detail?postid=${postid}`);
    } catch (error) {
      notification.error({
        message: t("notification_update_failed_title"),
        description: t("notification_update_failed_description"),
        placement: "topRight",
      });
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
                    <label htmlFor="title">{t("label_title")}</label>
                    <Input
                      id="title"
                      name="title"
                      value={values.title}
                      // onChange={handleChange}
                      onChange={(e) => setFieldValue("title", e.target.value)}
                      placeholder={t("placeholder_enter_post_title")}
                    />
                    {errors.title && touched.title && (
                      <div style={{ color: "red" }}>{errors.title}</div>
                    )}
                  </div>

                  {/* category radio */}
                  <div className="category-container">
                    <label htmlFor="category">{t("label_category")}</label>
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
                    <label htmlFor="content">{t("label_content")}</label>
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
                    <Button htmlType="submit">{t("button_update_post")}</Button>
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
