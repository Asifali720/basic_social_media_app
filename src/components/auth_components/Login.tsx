import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "../ui/button";
import googleIcon from "../../assets/images/google-icon.svg";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import "./auth.css";
import { Link } from "react-router-dom";
import { AuthContext, AuthContextType } from "../app_context/AppContext";
import { BounceLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useToast } from "../ui/use-toast";
import { title } from "process";

interface FormikValues {
  email: string;
  password: string;
}

const initialValues: FormikValues = {
  email: "",
  password: "",
};

const validationSchema: Yup.Schema<FormikValues> = Yup.object().shape({
  email: Yup.string()
    .email("please put valid email")
    .required("Email is required...!"),
  password: Yup.string()
    .required("password is required...!")
    .min(6, "password should at least 6 character")
    .matches(
      /^[a-zA-Z0-9!@#$%^&*()_+[\]{};':"\\|,.<>/?-]+$/,
      "Password can only contain letters, numbers, and special characters"
    ),
});

const Login: React.FC = () => {
  const [seePassword, setSeePassword] = React.useState(false);

  const { signInWithGoogle, loginWithEmailPassword, loading, setLoading, user, userData } =
    React.useContext(AuthContext) as AuthContextType;

  const {toast} = useToast();

  const navigate = useNavigate();

  const formik = useFormik<FormikValues>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      if(user || userData){
        setLoading(true);
        loginWithEmailPassword(values.email, values.password);
        toast({
          title: "Login successfully",
          description: "You have successfully logged in.",
        })
        setLoading(false);
        navigate("/");
      }else{
        toast({
          title: "Login failed",
          description: "invalid credentials",
        })
      }
    },
  });

  React.useEffect(()=>{
   setLoading(true);
   onAuthStateChanged(auth, (user) => {
     if(user){
      setLoading(false);
      navigate("/");
     }else{
      setLoading(false);
      navigate("/auth");
     }
   })
  }, [])

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <BounceLoader color="#10c3fc" />
        </div>
      ) : (
        <div className="bg-white p-4 rounded-xl">
          <h3 className="font-roboto font-bold text-2xl mb-6">Login now..!</h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col items-start mb-4">
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
            <div className="flex flex-col items-start mb-12">
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
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <span className="block w-full text-center text-sm font-roboto font-medium my-5">
            or
          </span>
          <Button
            className="w-full flex items-center gap-2"
            onClick={signInWithGoogle}
          >
            <img src={googleIcon} alt="icon" className="h-5 w-5" />
            <p>Login with Google</p>
          </Button>
          <Link to="/auth/reset">
            <p className="text-sky-500 font-roboto text-sm font-medium mt-5 text-center">
              Reset Password
            </p>
          </Link>
        </div>
      )}
    </>
  );
};

export default Login;
