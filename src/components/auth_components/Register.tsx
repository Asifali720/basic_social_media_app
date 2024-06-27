import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import "./auth.css";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { BounceLoader } from "react-spinners";
import { AuthContext, AuthContextType } from "../app_context/AppContext";
import { auth } from "../../firebase/config";

interface FormikValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

let initialValues: FormikValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema: Yup.Schema<FormikValues> = Yup.object().shape({
  username: Yup.string().required("please put username...!"),
  email: Yup.string()
    .required("email is required...!")
    .email("please put valid email"),
  password: Yup.string()
    .required("password is required...!")
    .min(6, "your password must be at least 6 character")
    .matches(
      /^[a-zA-Z0-9!@#$%^&*()_+[\]{};':"\\|,.<>/?-]+$/,
      "Password can only contain letters, numbers, and special characters"
    ),
  confirmPassword: Yup.string()
    .required("please confirm password...!")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const Register: React.FC = () => {
  const { toast } = useToast();
  const [seePassword, setSeePassword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);

  const {registerUserWithEmailAndPassword, setLoading, loading, isExistEmail} = useContext(AuthContext) as AuthContextType;

  const formik = useFormik<FormikValues>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      if (formik.isValid && !isExistEmail) {
        toast({
          title: "Form submitted successfully",
          description: "Your form has been submitted successfully go to login tab.",
        });
        setLoading(true);
        registerUserWithEmailAndPassword(values.email, values.password, values.username)
        setLoading(false);

      } else if (isExistEmail) {
         toast({
           title: "Error",
           description: "Email already exist.",
         })
      }
    },
  });

  return (
    <div className="bg-white p-4 rounded-xl">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <BounceLoader color="#10c3fc" />
        </div>
      ) : (
        <>
          <h3 className="font-roboto font-bold text-2xl mb-6">
            Register now..!
          </h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col items-start mb-2">
              <label
                htmlFor="username"
                className="text-gray-600 font-roboto text-sm font-medium mb-1"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className="w-full p-2 border-2 border-sky-500/50 rounded-sm focus:outline-none  focus:border-sky-500"
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-600 text-xs font-roboto mt-[2px]">
                  {formik.errors.username}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col items-start mb-2">
              <label
                htmlFor="email"
                className="text-gray-600 font-roboto text-sm font-medium mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full p-2 border-2 border-sky-500/50 rounded-sm focus:outline-none  focus:border-sky-500"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-600 text-xs font-roboto mt-[2px]">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col items-start mb-2">
              <label
                htmlFor="password"
                className="text-gray-600 font-roboto text-sm font-medium mb-1"
              >
                Password
              </label>
              <div className="w-full bg-white flex items-center border-2 border-sky-500/50 rounded-sm  focus:border-sky-500">
                <input
                  id="password"
                  name="password"
                  type={seePassword ? "text" : "password"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="w-full p-2 focus:outline-none"
                />
                <button
                  className="mr-2"
                  type="button"
                  onClick={() => setSeePassword(!seePassword)}
                >
                  {seePassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-600 text-xs font-roboto mt-[2px]">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col items-start mb-12">
              <label
                htmlFor="confirmPassword"
                className="text-gray-600 font-roboto text-sm font-medium mb-1"
              >
                Confirm Password
              </label>
              <div className="w-full bg-white flex items-center border-2 border-sky-500/50 rounded-sm  focus:border-sky-500">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={seeConfirmPassword ? "text" : "password"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  className="w-full p-2 focus:outline-none"
                />
                <button type="button"
                  className="mr-2"
                  onClick={() => setSeeConfirmPassword(!seeConfirmPassword)}
                >
                  {seeConfirmPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </button>
              </div>
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-red-600 text-xs font-roboto mt-[2px]">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default Register;
