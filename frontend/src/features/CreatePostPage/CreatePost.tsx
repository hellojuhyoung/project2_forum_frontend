import { CreatePostStyled } from "./styled";
import clsx from "clsx";

// axios request api url localhost:5001
import { instance } from "@/utils/apis/axios";

// import formik and their components
import { Form, Formik, Field } from "formik";

// import antd styled components
import { Button, Input } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface PostValues {
  title: string;
  content: string;
  thumbnail: string;
  contentImage: string;
  userid: number | null;
  categoryid: number | null;
}

const initialValues: PostValues = {
  title: "",
  content: "",
  thumbnail: "",
  contentImage: "",
  userid: null,
  categoryid: null,
};

const CreatePostPage: React.FC = () => {
  const authentication = useSelector(
    (state: RootState) => state.authentication
  );
  console.log(authentication);
  const id = authentication.id;

  console.log("this is create post id", id);
  const handleSubmit = async (values: PostValues) => {
    try {
      const createPostInfo = {
        title: values.title,
        content: values.content,
        thumbnail: values.thumbnail,
        contentImage: values.contentImage,
        userid: id,
        categoryid: values.categoryid,
      };

      const response = await instance.post("/posts/create", createPostInfo);

      console.log("response from create post", response);
    } catch (error) {
      console.error("error in creating a post", error);
    }
  };

  return (
    <>
      <CreatePostStyled className={clsx("create-post-container")}>
        <Formik<PostValues>
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleChange }) => {
            return (
              <>
                <Form>
                  {/* create post title input */}
                  <div className="title-container">
                    <Field
                      type="text"
                      id="title"
                      name="title"
                      placeholder="title"
                      as={Input}
                      onChange={(event: string) => {
                        handleChange(event);
                      }}
                    />
                  </div>
                  {/* create post content input */}
                  <div className="content-container">
                    <Field
                      type="text"
                      id="content"
                      name="content"
                      placeholder="content"
                      as={Input}
                      onChange={(event: string) => {
                        handleChange(event);
                      }}
                    />
                  </div>
                  {/* create post thumbnail input */}
                  <div className="thumbnail-container">
                    <Field
                      type="text"
                      id="thumbnail"
                      name="thumbnail"
                      placeholder="thumbnail"
                      as={Input}
                      onChange={(event: string) => {
                        handleChange(event);
                      }}
                    />
                  </div>
                  {/* create post content image input */}
                  <div className="content-image-container">
                    <Field
                      type="text"
                      id="contentImage"
                      name="contentImage"
                      placeholder="content image"
                      as={Input}
                      onChange={(event: string) => {
                        handleChange(event);
                      }}
                    />
                  </div>

                  {/* create post content categoryid input */}
                  <div className="categoryid-container">
                    <Field
                      type="text"
                      id="categoryid"
                      name="categoryid"
                      placeholder="categoryid"
                      as={Input}
                      onChange={(event: string) => {
                        handleChange(event);
                      }}
                    />
                  </div>

                  {/* ////////////////////////// */}
                  <div className="submit-button-container">
                    <Button htmlType="submit" disabled={isSubmitting}>
                      submit
                    </Button>
                  </div>
                </Form>
              </>
            );
          }}
        </Formik>
      </CreatePostStyled>
    </>
  );
};

export default CreatePostPage;
