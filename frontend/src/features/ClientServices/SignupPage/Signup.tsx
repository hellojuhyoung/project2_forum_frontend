import { SignupStyled } from "./styled";
import clsx from "clsx";

// import Yup to validate formik inputs
import * as Yup from "yup";

// axios request api url localhost:5001
import { instance } from "@/utils/apis/axios";

// import formik and their components
import { Form, Formik, Field, FormikHelpers, ErrorMessage } from "formik";

// import antd styled components
import { Button, Divider, Input, notification } from "antd";

// import useRouter from next/react
import { useRouter } from "next/router";

// declare the types of the input values for the user signup
interface SignupValues {
  username: string;
  password: string;
  // email: string;
}

// declare initial values for the inputs
const initialValues: SignupValues = {
  username: "",
  password: "",
  // email: "",
};

// using 'Yup' validate each input
const validationSchema = Yup.object().shape({
  username: Yup.string().min(4, "minimum of 4 characters"),

  password: Yup.string()
    .min(8, "minimum of 8 characters")
    .max(16, "maximum of 16 characters")
    .required("password is required"),

  // email: Yup.string()
  //   .email("please enter in the proper format")
  //   .required("email is required"),
});

const SignupPage: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (values: SignupValues) => {
    try {
      const signupInfo = {
        username: values.username,
        password: values.password,
        // email: values.email,
      };

      const response = await instance.post("/users", signupInfo);

      router.push("/auth/login");

      console.log("response from signup", response);
    } catch (error) {
      console.error("error in signup", error);
    }
  };

  return (
    <>
      <SignupStyled className={clsx("signup-container")}>
        <div className="input-container">
          <Formik<SignupValues>
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={true}
          >
            {({
              isSubmitting,
              handleBlur,
              handleChange,
              validateField,
              setFieldTouched,
            }) => {
              return (
                <>
                  <Form>
                    {/* signup username input */}
                    <div className="username-container">
                      <Field
                        type="text"
                        id="username"
                        name="username"
                        placeholder="please enter username"
                        as={Input}
                        onChange={(event: string) => {
                          handleChange(event);
                          validateField("username");
                          setFieldTouched("username", true, false);
                        }}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        render={(error) => (
                          <div className="error-message">{error}</div>
                        )}
                      />
                    </div>

                    {/* signup password input */}
                    <div className="password-container">
                      <Field
                        type="text"
                        id="password"
                        name="password"
                        placeholder="please enter password"
                        as={Input.Password}
                        onChange={(event: string) => {
                          handleChange(event);
                          validateField("password");
                          setFieldTouched("password", true, false);
                        }}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        render={(error) => (
                          <div className="error-message">{error}</div>
                        )}
                      />
                    </div>

                    {/* signup email input
                    <div className="email-container">
                      <Field
                        type="text"
                        id="email"
                        name="email"
                        placeholder="please enter email"
                        as={Input}
                        onChange={(event: string) => {
                          handleChange(event);
                          validateField("email");
                          setFieldTouched("email", true, false);
                        }}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        render={(error) => (
                          <div className="error-message">{error}</div>
                        )}
                      />
                    </div> */}

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
        </div>
      </SignupStyled>
    </>
  );
};

export default SignupPage;
